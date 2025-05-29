import { neon } from "@neondatabase/serverless"
import type { SharingPreference } from "@/types"

export class SharingDBService {
  static async getUserPreferences(userId: string): Promise<SharingPreference[]> {
    try {
      const sql = neon(process.env.DATABASE_URL!)

      const result = await sql`
        SELECT id, user_id, recipient_email, share_name, share_phone, is_active, created_at, updated_at
        FROM sharing_preferences 
        WHERE user_id = ${userId} AND is_active = true
        ORDER BY created_at DESC
      `

      return result.map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        recipientEmail: row.recipient_email,
        shareName: row.share_name,
        sharePhone: row.share_phone,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }))
    } catch (error) {
      console.error("Error fetching user preferences:", error)
      throw new Error("Failed to fetch sharing preferences")
    }
  }
}
