import { getCurrentUser } from "./auth"

export interface TrustScoreData {
  name?: string
  photo?: string
  phone_number?: string
  [key: string]: string | undefined
}

export interface TrustScoreItem {
  detail: string
  status: string
  score: number
  isVerified: boolean
}

/**
 * Sanitizes user ID to prevent path traversal attacks
 * @param userId - Numeric user ID
 * @returns Sanitized user ID or null if invalid
 */
function sanitizeUserId(userId: number | string): string | null {
  const userIdStr = String(userId)

  if (!/^\d+$/.test(userIdStr) || Number.parseInt(userIdStr) <= 0) {
    return null
  }

  const numericId = Number.parseInt(userIdStr)
  if (numericId < 1 || numericId > 999999) {
    return null
  }

  return userIdStr
}

/**
 * Maps JSON status values to display format for trustscore (only 2 states)
 * @param status - Raw status from JSON
 * @returns Standardized status and score
 */
function normalizeTrustScoreStatus(status: string): {
  status: string
  isVerified: boolean
  score: number
} {
  const normalizedStatus = status.toLowerCase().trim()

  switch (normalizedStatus) {
    case "verified":
      return { status: "VERIFIED", isVerified: true, score: 1 }
    case "not_verified":
    default:
      return { status: "NOT VERIFIED", isVerified: false, score: 0 }
  }
}

/**
 * Maps JSON field names to display names for trustscore
 * @param fieldName - Raw field name from JSON
 * @returns Display name
 */
function getTrustScoreDisplayName(fieldName: string): string {
  const fieldMap: Record<string, string> = {
    name: "NAME",
    photo: "PHOTO",
    phone_number: "PHONE NUMBER",
  }

  return fieldMap[fieldName.toLowerCase()] || fieldName.toUpperCase().replace(/_/g, " ")
}

/**
 * Fetches JSON data from a given file path
 * @param filePath - Path to the JSON file
 * @returns Promise with parsed JSON data or null if not found
 */
async function fetchJsonFile(filePath: string): Promise<any | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(filePath, {
      signal: controller.signal,
      cache: "default",
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return null
    }

    try {
      const jsonData = await response.json()

      if (!jsonData || typeof jsonData !== "object") {
        return null
      }

      return jsonData
    } catch (parseError) {
      console.warn(`Failed to parse JSON from ${filePath}:`, parseError)
      return null
    }
  } catch (error) {
    console.warn(`Failed to fetch ${filePath}:`, error)
    return null
  }
}

/**
 * Transforms trustscore data to UI format
 * @param trustScoreData - Raw trustscore data from JSON
 * @returns Array of trustscore items for UI display
 */
function transformTrustScoreData(trustScoreData: TrustScoreData): TrustScoreItem[] {
  return Object.entries(trustScoreData)
    .filter(([_, value]) => typeof value === "string")
    .map(([key, value]) => {
      const { status, isVerified, score } = normalizeTrustScoreStatus(value as string)
      return {
        detail: getTrustScoreDisplayName(key),
        status,
        score,
        isVerified,
      }
    })
    .sort((a, b) => {
      // Sort verified items first, then by detail name
      if (a.isVerified !== b.isVerified) {
        return a.isVerified ? -1 : 1
      }
      return a.detail.localeCompare(b.detail)
    })
}

/**
 * Calculates overall trust score percentage
 * @param items - Array of trust score items
 * @returns Overall percentage score
 */
function calculateOverallScore(items: TrustScoreItem[]): number {
  if (items.length === 0) return 0

  const totalScore = items.reduce((sum, item) => sum + item.score, 0)
  return Math.round((totalScore / items.length) * 100)
}

/**
 * Fetches trustscore data from JSON file using user ID with fallback to default.json
 * @param userId - Numeric user ID
 * @returns Promise with trustscore data or error
 */
export async function fetchTrustScoreData(userId: number | string): Promise<{
  success: boolean
  data?: TrustScoreItem[]
  overallScore?: number
  error?: string
  source?: "user" | "default" | "fallback"
}> {
  try {
    const sanitizedUserId = sanitizeUserId(userId)
    if (!sanitizedUserId) {
      return {
        success: false,
        error: "Invalid user ID format",
      }
    }

    // Try to fetch user-specific file first
    const userFilePath = `/data/${sanitizedUserId}.json`
    console.log(`Attempting to fetch user trustscore data: ${userFilePath}`)

    let jsonData = await fetchJsonFile(userFilePath)
    let source: "user" | "default" | "fallback" = "user"

    // If user file not found, try default.json
    if (!jsonData) {
      console.log(`User file ${userFilePath} not found, trying default.json`)
      const defaultFilePath = `/data/default.json`
      jsonData = await fetchJsonFile(defaultFilePath)
      source = "default"

      // If default.json also not found, use hardcoded fallback
      if (!jsonData) {
        console.log("Default.json not found, using hardcoded fallback")
        return {
          success: true,
          data: getDefaultTrustScoreData(),
          overallScore: calculateOverallScore(getDefaultTrustScoreData()),
          source: "fallback",
        }
      }
    }

    // Extract trustscore section from JSON
    const trustScoreSection = jsonData.trustscore
    if (!trustScoreSection || typeof trustScoreSection !== "object") {
      console.log("No trustscore section found, using fallback")
      return {
        success: true,
        data: getDefaultTrustScoreData(),
        overallScore: calculateOverallScore(getDefaultTrustScoreData()),
        source: "fallback",
      }
    }

    // Transform data for UI
    const trustScoreItems = transformTrustScoreData(trustScoreSection)
    const overallScore = calculateOverallScore(trustScoreItems)

    return {
      success: true,
      data: trustScoreItems,
      overallScore,
      source,
    }
  } catch (error) {
    console.error("TrustScore data fetch error:", error)

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network connection error",
      }
    }

    if (error instanceof Error && error.name === "AbortError") {
      return {
        success: false,
        error: "Request timeout",
      }
    }

    // Return fallback data even on error
    return {
      success: true,
      data: getDefaultTrustScoreData(),
      overallScore: calculateOverallScore(getDefaultTrustScoreData()),
      source: "fallback",
    }
  }
}

/**
 * Gets current user's trustscore data using their numeric user ID
 * @returns Promise with trustscore data
 */
export async function getCurrentUserTrustScoreData(): Promise<{
  success: boolean
  data?: TrustScoreItem[]
  overallScore?: number
  error?: string
  source?: "user" | "default" | "fallback"
}> {
  const user = getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: "User not authenticated",
    }
  }

  const userId = user.userId || user.numericUserId || user.id

  if (!userId) {
    return {
      success: false,
      error: "User ID not found in session",
    }
  }

  return fetchTrustScoreData(userId)
}

/**
 * Default trustscore data for fallback (hardcoded)
 */
export const getDefaultTrustScoreData = (): TrustScoreItem[] => [
  {
    detail: "NAME",
    status: "NOT VERIFIED",
    score: 0,
    isVerified: false,
  },
  {
    detail: "PHOTO",
    status: "NOT VERIFIED",
    score: 0,
    isVerified: false,
  },
  {
    detail: "PHONE NUMBER",
    status: "NOT VERIFIED",
    score: 0,
    isVerified: false,
  },
]
