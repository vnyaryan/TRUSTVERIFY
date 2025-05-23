import type { NextApiRequest, NextApiResponse } from "next"
import { serialize, parse } from "cookie"
import { sql } from "./db"

const SESSION_COOKIE = "trustverify_session"

export interface SessionData {
  sessionId: string
  email: string
  isLoggedIn: boolean
  createdAt: number
}

/**
 * Create a new session for the user and set the cookie in the API response
 */
export function createSessionApi(res: NextApiResponse, email: string): string {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

  const sessionData: SessionData = {
    sessionId,
    email,
    isLoggedIn: true,
    createdAt: Date.now(),
  }

  // Set cookie in response
  res.setHeader(
    "Set-Cookie",
    serialize(SESSION_COOKIE, JSON.stringify(sessionData), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  )

  return sessionId
}

/**
 * Get the current session from the API request
 */
export function getSessionFromRequest(req: NextApiRequest): SessionData | null {
  try {
    const cookies = parse(req.headers.cookie || "")
    const sessionCookie = cookies[SESSION_COOKIE]

    if (!sessionCookie) {
      return null
    }

    const sessionData: SessionData = JSON.parse(sessionCookie)

    // Check if session is expired (7 days)
    const isExpired = Date.now() - sessionData.createdAt > 60 * 60 * 24 * 7 * 1000

    if (isExpired) {
      return null
    }

    return sessionData
  } catch (error) {
    console.error("Error getting session from request:", error)
    return null
  }
}

/**
 * Delete the current session and clear the cookie in the API response
 */
export function deleteSessionApi(res: NextApiResponse): void {
  res.setHeader(
    "Set-Cookie",
    serialize(SESSION_COOKIE, "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    }),
  )
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUserApi(email: string, password: string): Promise<boolean> {
  try {
    // Get the user from the database
    const users = await sql`
      SELECT email_id, password FROM user_details WHERE email_id = ${email}
    `

    if (users.length === 0) {
      return false
    }

    const user = users[0]

    // Verify the password (you'll need to implement this function)
    // const passwordValid = await verifyPassword(password, user.password);

    // For now, just return true for testing
    return true
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

/**
 * Get user details from the database
 */
export async function getUserDetailsApi(email: string) {
  try {
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
      username: user.username,
    }
  } catch (error) {
    console.error("Error getting user details:", error)
    return null
  }
}
