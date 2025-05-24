import { testDatabaseConnection, checkUserDetailsTable, getUserCount } from "@/lib/db"

export async function GET() {
  try {
    // Test database connection
    const connectionTest = await testDatabaseConnection()

    // Check user_details table structure
    const tableCheck = await checkUserDetailsTable()

    // Get current user count
    const userCountResult = await getUserCount()

    return Response.json({
      success: true,
      message: "Database tests completed with App Router",
      results: {
        connection: connectionTest,
        table: tableCheck,
        userCount: userCountResult,
        timestamp: new Date().toISOString(),
        router: "App Router",
      },
    })
  } catch (error) {
    console.error("Database test error:", error)
    return Response.json(
      {
        success: false,
        message: "Database test failed",
        error: error instanceof Error ? error.message : "Unknown error",
        router: "App Router",
      },
      { status: 500 },
    )
  }
}
