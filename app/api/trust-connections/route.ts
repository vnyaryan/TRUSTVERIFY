import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail")

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "User email is required" }, { status: 400 })
    }

    console.log("Fetching trust connections for:", userEmail)

    // First, let's check the actual schema of the trust_connections table
    const schemaQuery = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'trust_connections'
      ORDER BY ordinal_position
    `

    console.log("Available columns in trust_connections:", schemaQuery)

    // Query without the is_active column since it doesn't exist
    const result = await sql`
      SELECT 
        id,
        sender_email AS "senderEmail",
        recipient_email AS "recipientEmail", 
        share_name AS "shareName",
        share_phone AS "sharePhone",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM 
        trust_connections
      WHERE 
        recipient_email = ${userEmail}
      ORDER BY 
        updated_at DESC
    `

    console.log("Query result:", result)

    // Transform the data to match the expected format
    const connections = result.map((row: any) => ({
      id: row.id,
      senderEmail: row.senderEmail,
      shareName: row.shareName,
      sharePhone: row.sharePhone,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      data: connections,
      count: connections.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch trust connections",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
