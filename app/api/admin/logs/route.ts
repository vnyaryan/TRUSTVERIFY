import { BlobLogger } from "@/lib/blob-logger"

export async function GET() {
  try {
    // Get logs from last 7 days
    const logs = await BlobLogger.getRecentLogs(7)

    return Response.json({
      success: true,
      logs,
      count: logs.length,
    })
  } catch (error) {
    console.error("Failed to fetch logs:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to fetch logs",
      },
      { status: 500 },
    )
  }
}
