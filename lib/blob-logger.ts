import { put, list } from "@vercel/blob"

export interface AuthLogEntry {
  timestamp: string
  eventType: "login_success" | "login_failure" | "signup_success" | "signup_failure"
  email: string
  ipAddress?: string
  userAgent?: string
  errorMessage?: string
  additionalData?: Record<string, any>
}

export class BlobLogger {
  private static getLogFileName(): string {
    const today = new Date().toISOString().split("T")[0]
    return `auth-logs/auth-${today}.json`
  }

  static async logAuthEvent(event: Omit<AuthLogEntry, "timestamp">): Promise<void> {
    try {
      const logEntry: AuthLogEntry = {
        timestamp: new Date().toISOString(),
        ...event,
      }

      const fileName = this.getLogFileName()

      // Get existing logs for today
      let existingLogs: AuthLogEntry[] = []

      try {
        // Check if today's log file exists
        const { blobs } = await list({ prefix: fileName })

        if (blobs.length > 0) {
          const response = await fetch(blobs[0].url)
          if (response.ok) {
            existingLogs = await response.json()
          }
        }
      } catch (error) {
        console.log("Creating new log file for today")
      }

      // Add new log entry
      existingLogs.push(logEntry)

      // Upload updated logs to Vercel Blob
      const blob = await put(fileName, JSON.stringify(existingLogs, null, 2), {
        access: "public",
        contentType: "application/json",
      })

      console.log(`Log written to: ${blob.url}`)
    } catch (error) {
      console.error("Failed to write log to Vercel Blob:", error)
      // Fallback to console logging
      console.log("AUTH_LOG:", JSON.stringify(event, null, 2))
    }
  }

  static async getLogsByDate(date: string): Promise<AuthLogEntry[]> {
    try {
      const fileName = `auth-logs/auth-${date}.json`

      // List blobs to check if file exists
      const { blobs } = await list({ prefix: fileName })

      if (blobs.length === 0) {
        return []
      }

      // Fetch the blob content
      const response = await fetch(blobs[0].url)

      if (!response.ok) {
        return []
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to read logs:", error)
      return []
    }
  }

  static async getRecentLogs(days = 7): Promise<AuthLogEntry[]> {
    try {
      const allLogs: AuthLogEntry[] = []

      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split("T")[0]

        const dayLogs = await this.getLogsByDate(dateStr)
        allLogs.push(...dayLogs)
      }

      return allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    } catch (error) {
      console.error("Failed to get recent logs:", error)
      return []
    }
  }
}

// Export the static method as a named export for easier importing
export const logAuthEvent = BlobLogger.logAuthEvent.bind(BlobLogger)
export const getLogsByDate = BlobLogger.getLogsByDate.bind(BlobLogger)
export const getRecentLogs = BlobLogger.getRecentLogs.bind(BlobLogger)
