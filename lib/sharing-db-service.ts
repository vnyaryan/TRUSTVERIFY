import { sql } from "@/lib/db"
import type { SharingPreference, SharingHistory } from "@/types/sharing"

// Make sure to export the class properly
export class SharingDbService {
  // Get all sharing preferences for a user
  static async getUserPreferences(userId: string): Promise<SharingPreference[]> {
    try {
      const result = await sql`
        SELECT 
          id,
          user_id as "userId",
          recipient_email as "recipientEmail",
          share_name as "shareName",
          share_phone as "sharePhone",
          is_active as "isActive",
          created_at as "createdAt",
          updated_at as "updatedAt"
        FROM sharing_preferences 
        WHERE user_id = ${userId} AND is_active = true
        ORDER BY created_at DESC
      `
      return result as SharingPreference[]
    } catch (error) {
      console.error("Error fetching user preferences:", error)
      throw new Error("Failed to fetch sharing preferences")
    }
  }

  // Save or update sharing preference
  static async savePreference(preference: SharingPreference): Promise<SharingPreference> {
    try {
      const result = await sql`
        INSERT INTO sharing_preferences (
          user_id, 
          recipient_email, 
          share_name, 
          share_phone,
          updated_at
        ) VALUES (
          ${preference.userId},
          ${preference.recipientEmail},
          ${preference.shareName},
          ${preference.sharePhone},
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (user_id, recipient_email) 
        DO UPDATE SET
          share_name = EXCLUDED.share_name,
          share_phone = EXCLUDED.share_phone,
          updated_at = CURRENT_TIMESTAMP,
          is_active = true
        RETURNING 
          id,
          user_id as "userId",
          recipient_email as "recipientEmail",
          share_name as "shareName",
          share_phone as "sharePhone",
          is_active as "isActive",
          created_at as "createdAt",
          updated_at as "updatedAt"
      `
      return result[0] as SharingPreference
    } catch (error) {
      console.error("Error saving preference:", error)
      throw new Error("Failed to save sharing preference")
    }
  }

  // Delete sharing preference
  static async deletePreference(userId: string, recipientEmail: string): Promise<boolean> {
    try {
      await sql`
        UPDATE sharing_preferences 
        SET is_active = false, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId} AND recipient_email = ${recipientEmail}
      `
      return true
    } catch (error) {
      console.error("Error deleting preference:", error)
      throw new Error("Failed to delete sharing preference")
    }
  }

  // Save sharing history
  static async saveHistory(history: SharingHistory): Promise<SharingHistory> {
    try {
      const result = await sql`
        INSERT INTO sharing_history (
          user_id,
          recipient_email,
          shared_data,
          status
        ) VALUES (
          ${history.userId},
          ${history.recipientEmail},
          ${JSON.stringify(history.sharedData)},
          ${history.status}
        )
        RETURNING 
          id,
          user_id as "userId",
          recipient_email as "recipientEmail",
          shared_data as "sharedData",
          shared_at as "sharedAt",
          status
      `
      return result[0] as SharingHistory
    } catch (error) {
      console.error("Error saving history:", error)
      throw new Error("Failed to save sharing history")
    }
  }

  // Get sharing history for a user
  static async getUserHistory(userId: string, limit = 50): Promise<SharingHistory[]> {
    try {
      const result = await sql`
        SELECT 
          id,
          user_id as "userId",
          recipient_email as "recipientEmail",
          shared_data as "sharedData",
          shared_at as "sharedAt",
          status
        FROM sharing_history 
        WHERE user_id = ${userId}
        ORDER BY shared_at DESC
        LIMIT ${limit}
      `
      return result as SharingHistory[]
    } catch (error) {
      console.error("Error fetching history:", error)
      throw new Error("Failed to fetch sharing history")
    }
  }
}

// Alternative export syntax to ensure it's properly exported
// export { SharingDbService };
