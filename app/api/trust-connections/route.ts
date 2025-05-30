import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userEmail = searchParams.get("userEmail")

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "User email is required" }, { status: 400 })
    }

    // Extract email if it's a JSON object
    let email = userEmail
    try {
      if (userEmail.startsWith("{")) {
        const userObj = JSON.parse(userEmail)
        email = userObj.email || userEmail
      }
    } catch (e) {
      // If parsing fails, use the original value
      console.log("Failed to parse userEmail as JSON, using as-is:", e)
    }

    console.log("Fetching trust connections for email:", email)

    // Let's first check what data exists in the table
    const allData = await sql`
      SELECT * FROM trust_connections
    `
    console.log("All data in trust_connections table:", allData)

    // Check specifically for raj@gmail.com as recipient
    const rajData = await sql`
      SELECT * FROM trust_connections 
      WHERE recipient_email = 'raj@gmail.com'
    `
    console.log("Data for raj@gmail.com as recipient:", rajData)

    // Now run our main query
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
        recipient_email = ${email}
      ORDER BY 
        updated_at DESC
    `

    console.log("Main query result for email", email, ":", result)

    // Transform the data to match the expected format
    const connections = result.map((row: any) => ({
      id: row.id,
      senderEmail: row.senderEmail,
      shareName: row.shareName,
      sharePhone: row.sharePhone,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }))

    console.log("Transformed connections:", connections)

    return NextResponse.json({
      success: true,
      data: connections,
      count: connections.length,
      debug: {
        searchedEmail: email,
        originalParam: userEmail,
        allDataCount: allData.length,
        rajDataCount: rajData.length,
      },
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
