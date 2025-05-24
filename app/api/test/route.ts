import type { NextRequest } from "next/server"

export async function GET() {
  return Response.json({
    success: true,
    message: "API is working correctly with App Router!",
    timestamp: new Date().toISOString(),
    router: "App Router",
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return Response.json({
      success: true,
      message: "POST request received",
      data: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid JSON in request body",
      },
      { status: 400 },
    )
  }
}
