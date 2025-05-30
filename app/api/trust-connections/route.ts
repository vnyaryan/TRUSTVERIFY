import { type NextRequest, NextResponse } from "next/server"
import { TrustConnectionsService, type TrustConnectionsFilter } from "@/lib/trust-connections-service"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user from the session
    // For now, we'll use a query parameter or default
    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail") || "vny.aryan@gmail.com"

    // Parse filter parameters
    const sortBy = (searchParams.get("sortBy") as TrustConnectionsFilter["sortBy"]) || "recent"
    const filterBy = (searchParams.get("filterBy") as TrustConnectionsFilter["filterBy"]) || "all"
    const search = searchParams.get("search") || undefined

    const filter: TrustConnectionsFilter = { sortBy, filterBy, search }

    const connections = await TrustConnectionsService.getConnectionsByRecipient(userEmail, filter)

    return NextResponse.json({ success: true, data: connections })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch trust connections" }, { status: 500 })
  }
}
