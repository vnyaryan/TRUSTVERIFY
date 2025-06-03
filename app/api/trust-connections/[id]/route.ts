import { type NextRequest, NextResponse } from "next/server"
import { TrustConnectionsService } from "@/lib/trust-connections-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real app, you would get the user from the session
    // For now, we'll use a query parameter or default
    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail") || "vny.aryan@gmail.com"

    const id = Number.parseInt(params.id, 10)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 })
    }

    const connection = await TrustConnectionsService.getConnectionDetail(id, userEmail)

    if (!connection) {
      return NextResponse.json({ success: false, error: "Connection not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: connection })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch trust connection" }, { status: 500 })
  }
}
