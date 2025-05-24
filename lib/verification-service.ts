import { getCurrentUser } from "./auth"

export interface VerificationData {
  aadhaar_card?: string
  pan_card?: string
  passport?: string
  [key: string]: string | undefined
}

export interface VerificationItem {
  document: string
  status: string
  isVerified: boolean
}

/**
 * Sanitizes user ID to prevent path traversal attacks
 * @param userId - Numeric user ID
 * @returns Sanitized user ID or null if invalid
 */
function sanitizeUserId(userId: number | string): string | null {
  // Convert to string and validate it's a positive integer
  const userIdStr = String(userId)

  // Check if it's a valid positive integer
  if (!/^\d+$/.test(userIdStr) || Number.parseInt(userIdStr) <= 0) {
    return null
  }

  // Additional safety check for reasonable range (1 to 999999)
  const numericId = Number.parseInt(userIdStr)
  if (numericId < 1 || numericId > 999999) {
    return null
  }

  return userIdStr
}

/**
 * Maps JSON status values to display format
 * @param status - Raw status from JSON
 * @returns Standardized status
 */
function normalizeStatus(status: string): { status: string; isVerified: boolean } {
  const normalizedStatus = status.toLowerCase().trim()

  switch (normalizedStatus) {
    case "verified":
    case "approved":
    case "complete":
      return { status: "VERIFIED", isVerified: true }
    case "pending":
    case "processing":
    case "in_progress":
      return { status: "PENDING", isVerified: false }
    case "rejected":
    case "failed":
    case "denied":
      return { status: "REJECTED", isVerified: false }
    case "not_verified":
    case "incomplete":
    case "missing":
    default:
      return { status: "NOT VERIFIED", isVerified: false }
  }
}

/**
 * Maps JSON field names to display names
 * @param fieldName - Raw field name from JSON
 * @returns Display name
 */
function getDisplayName(fieldName: string): string {
  const fieldMap: Record<string, string> = {
    aadhaar_card: "AADHAAR CARD",
    aadhaard_card: "AADHAAR CARD", // Handle typo in existing data
    pan_card: "PAN CARD",
    passport: "PASSPORT",
    driving_license: "DRIVING LICENSE",
    voter_id: "VOTER ID",
    birth_certificate: "BIRTH CERTIFICATE",
  }

  return fieldMap[fieldName.toLowerCase()] || fieldName.toUpperCase().replace(/_/g, " ")
}

/**
 * Fetches JSON data from a given file path
 * @param filePath - Path to the JSON file
 * @returns Promise with parsed JSON data or null if not found
 */
async function fetchJsonFile(filePath: string): Promise<VerificationData | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(filePath, {
      signal: controller.signal,
      cache: "default", // Enable browser caching
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return null // File not found or other error
    }

    // Parse JSON with error handling
    try {
      const jsonData = await response.json()

      // Validate JSON structure
      if (!jsonData || typeof jsonData !== "object") {
        return null
      }

      return jsonData as VerificationData
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
 * Transforms verification data to UI format
 * @param jsonData - Raw verification data from JSON
 * @returns Array of verification items for UI display
 */
function transformVerificationData(jsonData: VerificationData): VerificationItem[] {
  return Object.entries(jsonData)
    .filter(([_, value]) => typeof value === "string") // Only process string values
    .map(([key, value]) => {
      const { status, isVerified } = normalizeStatus(value as string)
      return {
        document: getDisplayName(key),
        status,
        isVerified,
      }
    })
    .sort((a, b) => {
      // Sort verified items first, then by document name
      if (a.isVerified !== b.isVerified) {
        return a.isVerified ? -1 : 1
      }
      return a.document.localeCompare(b.document)
    })
}

/**
 * Fetches verification data from JSON file using user ID with fallback to default.json
 * @param userId - Numeric user ID
 * @returns Promise with verification data or error
 */
export async function fetchVerificationData(userId: number | string): Promise<{
  success: boolean
  data?: VerificationItem[]
  error?: string
  source?: "user" | "default" | "fallback"
}> {
  try {
    // Sanitize user ID for security
    const sanitizedUserId = sanitizeUserId(userId)
    if (!sanitizedUserId) {
      return {
        success: false,
        error: "Invalid user ID format",
      }
    }

    // Try to fetch user-specific file first
    const userFilePath = `/data/${sanitizedUserId}.json`
    console.log(`Attempting to fetch user verification data: ${userFilePath}`)

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
          data: getDefaultVerificationData(),
          source: "fallback",
        }
      }
    }

    // Transform data for UI
    const verificationItems = transformVerificationData(jsonData)

    return {
      success: true,
      data: verificationItems,
      source,
    }
  } catch (error) {
    console.error("Verification data fetch error:", error)

    // Handle specific error types
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
      data: getDefaultVerificationData(),
      source: "fallback",
    }
  }
}

/**
 * Gets current user's verification data using their numeric user ID
 * @returns Promise with verification data
 */
export async function getCurrentUserVerificationData(): Promise<{
  success: boolean
  data?: VerificationItem[]
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

  // Try to get user ID from user object
  const userId = user.userId || user.numericUserId || user.id

  if (!userId) {
    return {
      success: false,
      error: "User ID not found in session",
    }
  }

  return fetchVerificationData(userId)
}

/**
 * Default verification data for fallback (hardcoded)
 */
export const getDefaultVerificationData = (): VerificationItem[] => [
  {
    document: "PAN CARD",
    status: "NOT VERIFIED",
    isVerified: false,
  },
  {
    document: "AADHAAR CARD",
    status: "NOT VERIFIED",
    isVerified: false,
  },
  {
    document: "PASSPORT",
    status: "NOT VERIFIED",
    isVerified: false,
  },
]
