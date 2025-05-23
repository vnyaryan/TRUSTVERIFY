// Client-side session management
import Cookies from "js-cookie"

export interface SessionData {
  sessionId: string
  email: string
  isLoggedIn: boolean
  createdAt: number
}

/**
 * Get the current session from client-side cookies
 */
export function getClientSession(): SessionData | null {
  try {
    const sessionCookie = Cookies.get("trustverify_session")

    if (!sessionCookie) {
      return null
    }

    const sessionData: SessionData = JSON.parse(sessionCookie)

    // Check if session is expired (7 days)
    const isExpired = Date.now() - sessionData.createdAt > 60 * 60 * 24 * 7 * 1000

    if (isExpired) {
      deleteClientSession()
      return null
    }

    return sessionData
  } catch (error) {
    console.error("Error getting client session:", error)
    // If there's an error parsing the session, clear it
    deleteClientSession()
    return null
  }
}

/**
 * Delete the current session from client-side cookies
 */
export function deleteClientSession(): void {
  try {
    // Delete the main session cookie
    Cookies.remove("trustverify_session")

    // Also try to delete any legacy session cookies
    Cookies.remove("session")
  } catch (error) {
    console.error("Error deleting client session:", error)
  }
}

/**
 * Check if user is authenticated on the client side
 */
export function isClientAuthenticated(): boolean {
  const session = getClientSession()
  return session !== null && session.isLoggedIn
}
