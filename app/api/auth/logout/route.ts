import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/session"

export async function POST() {
  try {
    // Delete the session
    deleteSession()

    return NextResponse.json({ success: true, message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // Support GET method for simple logout links
  return POST()
}
