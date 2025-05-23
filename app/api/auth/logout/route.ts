import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/session"

export async function POST() {
  try {
    // Delete the session
    deleteSession()

    // Return success response with proper headers
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })

    // Clear any additional cookies that might exist
    response.cookies.delete("trustverify_session")
    response.cookies.delete("session") // Legacy cookie cleanup

    // Set cache control headers to prevent caching
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")

    return response
  } catch (error) {
    console.error("Logout error:", error)

    // Even if there's an error, try to clear the session
    try {
      deleteSession()
    } catch (cleanupError) {
      console.error("Session cleanup error:", cleanupError)
    }

    return NextResponse.json(
      {
        error: "Logout failed",
        message: "An error occurred during logout",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  // Support GET method for simple logout links
  return POST()
}
