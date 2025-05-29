import { type NextRequest, NextResponse } from "next/server"
import { SharingDbService } from "@/lib/sharing-db-service"
import type { SharingHistory, ApiResponse } from "@/types/sharing"

// GET - Fetch user's sharing history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 },
      )
    }

    const history = await SharingDbService.getUserHistory(userId, limit)

    return NextResponse.json<ApiResponse<SharingHistory[]>>({
      success: true,
      data: history,
      message: "History fetched successfully",
    })
  } catch (error) {
    console.error("GET /api/sharing/history error:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to fetch history",
      },
      { status: 500 },
    )
  }
}

// POST - Save sharing history entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, recipientEmail, sharedData, status } = body

    if (!userId || !recipientEmail || !sharedData) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "User ID, recipient email, and shared data are required",
        },
        { status: 400 },
      )
    }

    const historyEntry: SharingHistory = {
      userId,
      recipientEmail: recipientEmail.toLowerCase(),
      sharedData,
      status: status || "sent",
    }

    const savedHistory = await SharingDbService.saveHistory(historyEntry)

    return NextResponse.json<ApiResponse<SharingHistory>>({
      success: true,
      data: savedHistory,
      message: "History saved successfully",
    })
  } catch (error) {
    console.error("POST /api/sharing/history error:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to save history",
      },
      { status: 500 },
    )
  }
}
