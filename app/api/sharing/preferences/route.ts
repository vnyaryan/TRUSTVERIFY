import { type NextRequest, NextResponse } from "next/server"
import { SharingDbService } from "@/lib/sharing-db-service"
import type { SharingPreference, ApiResponse } from "@/types/sharing"

// GET - Fetch user's sharing preferences
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 },
      )
    }

    const preferences = await SharingDbService.getUserPreferences(userId)

    return NextResponse.json<ApiResponse<SharingPreference[]>>({
      success: true,
      data: preferences,
      message: "Preferences fetched successfully",
    })
  } catch (error) {
    console.error("GET /api/sharing/preferences error:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to fetch preferences",
      },
      { status: 500 },
    )
  }
}

// POST - Save sharing preference
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, recipientEmail, shareName, sharePhone } = body

    if (!userId || !recipientEmail) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "User ID and recipient email are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 },
      )
    }

    const preference: SharingPreference = {
      userId,
      recipientEmail: recipientEmail.toLowerCase(),
      shareName: Boolean(shareName),
      sharePhone: Boolean(sharePhone),
    }

    const savedPreference = await SharingDbService.savePreference(preference)

    return NextResponse.json<ApiResponse<SharingPreference>>({
      success: true,
      data: savedPreference,
      message: "Preference saved successfully",
    })
  } catch (error) {
    console.error("POST /api/sharing/preferences error:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to save preference",
      },
      { status: 500 },
    )
  }
}

// DELETE - Remove sharing preference
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const recipientEmail = searchParams.get("recipientEmail")

    if (!userId || !recipientEmail) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "User ID and recipient email are required",
        },
        { status: 400 },
      )
    }

    await SharingDbService.deletePreference(userId, recipientEmail)

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      message: "Preference deleted successfully",
    })
  } catch (error) {
    console.error("DELETE /api/sharing/preferences error:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to delete preference",
      },
      { status: 500 },
    )
  }
}
