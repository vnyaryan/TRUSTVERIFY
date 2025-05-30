import { sql } from "@/lib/db"

export interface TrustConnection {
  id: number
  senderEmail: string
  senderName?: string
  shareName: boolean
  sharePhone: boolean
  createdAt: string
  updatedAt: string
}

export class TrustConnectionsService {
  static async getConnectionsByRecipient(recipientEmail: string): Promise<TrustConnection[]> {
    try {
      console.log("Fetching connections for recipient:", recipientEmail)

      const result = await sql`
        SELECT 
          tc.id,
          tc.user_id AS "senderEmail",
          tc.share_name AS "shareName",
          tc.share_phone AS "sharePhone",
          tc.created_at AS "createdAt",
          tc.updated_at AS "updatedAt"
        FROM 
          trust_connections tc
        WHERE 
          tc.recipient_email = ${recipientEmail}
          AND tc.is_active = true
        ORDER BY 
          tc.updated_at DESC
      `

      console.log("Service query result:", result)
      return result as TrustConnection[]
    } catch (error) {
      console.error("Error in TrustConnectionsService:", error)
      throw new Error("Failed to fetch trust connections")
    }
  }
}
