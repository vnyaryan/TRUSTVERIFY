import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@/lib/constants"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value
    const userSession = cookieStore.get("user-session")?.value

    if (!token || !userSession) {
      return NextResponse.json({ success: false, message: "No active session" }, { status: 401 })
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const userData = JSON.parse(userSession)

      return NextResponse.json({
        success: true,
        user: userData,
        isAuthenticated: true,
      })
    } catch (jwtError) {
      // Token is invalid
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 })
    }
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ success: false, message: "Session validation failed" }, { status: 500 })
  }
}
