import { getSql } from "./db"

const SESSION_COOKIE = "trustverify_session"

export interface SessionData {
  sessionId: string
  email: string
  isLoggedIn: boolean
  createdAt: number
}

/**
 * Generate a secure session token
 */
export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Create session data object
 */
export function createSessionData(email: string): SessionData {
  return {
    sessionId: generateSessionToken(),
    email,
    isLoggedIn: true,
    createdAt: Date.now(),
  }
}

/**
 * Check if session is expired
 */
export function isSessionExpired(sessionData: SessionData): boolean {
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
  return Date.now() - sessionData.createdAt > sevenDaysInMs
}

/**
 * Validate session data structure
 */
export function isValidSessionData(data: any): data is SessionData {
  return (
    data &&
    typeof data === "object" &&
    typeof data.sessionId === "string" &&
    typeof data.email === "string" &&
    typeof data.isLoggedIn === "boolean" &&
    typeof data.createdAt === "number"
  )
}

/**
 * Create a new session for the user (client-safe version)
 */
export async function createSession(email: string): Promise<string> {
  const sessionId = generateSessionToken()

  // This is a client-safe version that returns the session ID
  // The actual cookie setting should be done via API routes
  console.log(`Session created for user: ${email}`)

  return sessionId
}

/**
 * Get the current session (client-safe version)
 */
export function getSession(): SessionData | null {
  // This is a client-safe version that doesn't use next/headers
  // In a real implementation, this would check localStorage or make an API call
  console.log("Getting session - client-safe version")

  // For now, return null to indicate no session
  // This should be implemented via API calls in the client
  return null
}

/**
 * Delete the current session (client-safe version)
 */
export function deleteSession(): void {
  // This is a client-safe version that doesn't use next/headers
  // The actual session deletion should be done via API routes
  console.log("Deleting session - client-safe version")
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUser(email: string, password: string): Promise<boolean> {
  try {
    const sql = getSql()

    // Get the user from the database
    const users = await sql`
      SELECT email_id, password FROM user_details WHERE email_id = ${email}
    `

    if (users.length === 0) {
      return false
    }

    const user = users[0]

    // Note: Password verification would need to be implemented here
    // For now, just checking if user exists
    return true
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

/**
 * Get user details from the database
 */
export async function getUserDetails(email: string) {
  try {
    const sql = getSql()

    console.log(`Fetching user details for email: ${email}`)

    const users = await sql`
      SELECT 
        email_id, 
        first_name, 
        last_name, 
        phone_number, 
        sex as gender, 
        date_of_birth, 
        created_at,
        username
      FROM user_details 
      WHERE email_id = ${email}
    `

    console.log(`Query result:`, users)

    if (users.length === 0) {
      console.log(`No user found for email: ${email}`)
      return null
    }

    const user = users[0]

    return {
      email: user.email_id,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      gender: user.gender,
      dateOfBirth: user.date_of_birth,
      createdAt: user.created_at,
      username: user.username,
    }
  } catch (error) {
    console.error("Error getting user details:", error)
    return null
  }
}

/**
 * Check if user is authenticated (client-safe version)
 */
export function isAuthenticated(): boolean {
  const session = getSession()
  return session !== null && session.isLoggedIn
}

/**
 * Require authentication - throws error if not authenticated (client-safe version)
 */
export function requireAuth(): SessionData {
  const session = getSession()

  if (!session || !session.isLoggedIn) {
    throw new Error("Authentication required")
  }

  return session
}

/**
 * Validate session integrity
 */
export function validateSession(sessionData: SessionData): boolean {
  if (!sessionData || typeof sessionData !== "object") {
    return false
  }

  const requiredFields = ["sessionId", "email", "isLoggedIn", "createdAt"]
  return requiredFields.every((field) => field in sessionData)
}
