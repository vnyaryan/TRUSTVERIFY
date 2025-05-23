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
    return null
  }
}

/**
 * Delete the current session
 */
export function deleteSession(): void {
  cookies().delete(SESSION_COOKIE)
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

    const users = await sql`
      SELECT 
        email_id, 
        first_name, 
        last_name, 
        phone_number, 
        gender, 
        date_of_birth, 
        created_at 
      FROM user_details 
      WHERE email_id = ${email}
    `

    if (users.length === 0) {
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
