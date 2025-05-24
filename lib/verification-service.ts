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
 * Sanitizes username to prevent path traversal attacks
 * @param username - Raw username input
 * @returns Sanitized username or null if invalid
 */
function sanitizeUsername(username: string): string | null {
  // Remove any path traversal attempts and special characters
  const sanitized = username.replace(/[^a-zA-Z0-9_-]/g, "")

  // Validate length and format
  if (sanitized.length < 1 || sanitized.length > 50) {
    return null
  }

  // Ensure it doesn't start with dots or contain only dots
  if (sanitized.startsWith(".") || sanitized === "." || sanitized === "..") {
    return null
  }

  return sanitized
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
 * Fetches verification data from JSON file
 * @param username - User identifier
 * @returns Promise with verification data or error
 */
export async function fetchVerificationData(username: string): Promise<{
  success: boolean
  data?: VerificationItem[]
  error?: string
}> {
  try {
    // Sanitize username for security
    const sanitizedUsername = sanitizeUsername(username)
    if (!sanitizedUsername) {
      return {
        success: false,
        error: "Invalid username format",
      }
    }

    // Construct file path
    const filePath = `/data/${sanitizedUsername}.json`

    // Fetch with timeout for performance
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(filePath, {
      signal: controller.signal,
      cache: "default", // Enable browser caching
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: "Verification data not found",
        }
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    // Parse JSON with error handling
    let jsonData: VerificationData
    try {
      jsonData = await response.json()
    } catch (parseError) {
      return {
        success: false,
        error: "Invalid data format",
      }
    }

    // Validate JSON structure
    if (!jsonData || typeof jsonData !== "object") {
      return {
        success: false,
        error: "Invalid data structure",
      }
    }

    // Transform data for UI
    const verificationItems: VerificationItem[] = Object.entries(jsonData)
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

    return {
      success: true,
      data: verificationItems,
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

    return {
      success: false,
      error: "Failed to load verification data",
    }
  }
}

/**
 * Gets current user's verification data
 * @returns Promise with verification data
 */
export async function getCurrentUserVerificationData(): Promise<{
  success: boolean
  data?: VerificationItem[]
  error?: string
}> {
  const user = getCurrentUser()

  if (!user || !user.username) {
    return {
      success: false,
      error: "User not authenticated",
    }
  }

  return fetchVerificationData(user.username)
}

/**
 * Default verification data for fallback
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
