import { type NextRequest, NextResponse } from "next/server"
import { SharingDbService } from "@/lib/sharing-db-service"
import type { SharingPreference } from "@/types/sharing"

// GET /api/sharing/preferences?userId=123
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const preferences = await SharingDbService.getUserPreferences(userId)

    return NextResponse.json({
      success: true,
      data: preferences,
    })
  } catch (error) {
    console.error("Error in GET /api/sharing/preferences:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch sharing preferences" }, { status: 500 })
  }
}

// POST /api/sharing/preferences
export async function POST(request: NextRequest) {
  try {
    const body: SharingPreference = await request.json()

    // Validate required fields
    if (!body.userId || !body.recipientEmail) {
      return NextResponse.json({ success: false, error: "User ID and recipient email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.recipientEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    const savedPreference = await SharingDbService.savePreference(body)

    return NextResponse.json({
      success: true,
      data: savedPreference,
    })
  } catch (error) {
    console.error("Error in POST /api/sharing/preferences:", error)
    return NextResponse.json({ success: false, error: "Failed to save sharing preference" }, { status: 500 })
  }
}

// DELETE /api/sharing/preferences?userId=123&recipientEmail=test@example.com
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    const recipientEmail = request.nextUrl.searchParams.get("recipientEmail")

    if (!userId || !recipientEmail) {
      return NextResponse.json({ success: false, error: "User ID and recipient email are required" }, { status: 400 })
    }

    await SharingDbService.deletePreference(userId, recipientEmail)

    return NextResponse.json({
      success: true,
      message: "Preference deleted successfully",
    })
  } catch (error) {
    console.error("Error in DELETE /api/sharing/preferences:", error)
    return NextResponse.json({ success: false, error: "Failed to delete sharing preference" }, { status: 500 })
  }
}
