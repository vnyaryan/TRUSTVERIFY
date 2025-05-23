import { cookies } from "next/headers"
import { getSql } from "./db"
import { verifyPassword } from "./auth"

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
 * Create a new session for the user
 */
export async function createSession(email: string): Promise<string> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

  const sessionData: SessionData = {
    sessionId,
    email,
    isLoggedIn: true,
    createdAt: Date.now(),
  }

  // Store session in a cookie
  cookies().set({
    name: SESSION_COOKIE,
    value: JSON.stringify(sessionData),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return sessionId
}

/**
 * Get the current session
 */
export function getSession(): SessionData | null {
  try {
    const sessionCookie = cookies().get(SESSION_COOKIE)

    if (!sessionCookie) {
      return null
    }

    const sessionData: SessionData = JSON.parse(sessionCookie.value)

    // Check if session is expired (7 days)
    const isExpired = Date.now() - sessionData.createdAt > 60 * 60 * 24 * 7 * 1000

    if (isExpired) {
      deleteSession()
      return null
    }

    return sessionData
  } catch (error) {
    console.error("Error getting session:", error)
    // If there's an error parsing the session, clear it
    deleteSession()
    return null
  }
}

/**
 * Delete the current session - Enhanced for security
 */
export function deleteSession(): void {
  try {
    // Delete the main session cookie
    cookies().delete(SESSION_COOKIE)

    // Also try to delete any legacy session cookies
    cookies().delete("session")

    // Set expired cookies to ensure cleanup
    cookies().set({
      name: SESSION_COOKIE,
      value: "",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
    })
  } catch (error) {
    console.error("Error deleting session:", error)
    // Continue execution even if cookie deletion fails
  }
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

    // Verify the password
    const passwordValid = verifyPassword(user.password, password)

    return passwordValid
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
        gender, 
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
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const session = getSession()
  return session !== null && session.isLoggedIn
}

/**
 * Require authentication - throws error if not authenticated
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
