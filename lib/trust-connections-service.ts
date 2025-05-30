import { sql } from "@/lib/db"

export interface TrustConnection {
  id: number
  senderEmail: string
  senderName?: string
  shareName: boolean
  sharePhone: boolean
  createdAt: string
  updatedAt: string
}

export interface TrustConnectionDetail extends TrustConnection {
  nameVerified?: boolean
  phoneVerified?: boolean
  nameValue?: string
  phoneValue?: string
}

export interface TrustConnectionsFilter {
  sortBy?: "recent" | "email"
  filterBy?: "all" | "name" | "phone" | "verified"
  search?: string
}

export class TrustConnectionsService {
  static async getConnectionsByRecipient(
    recipientEmail: string,
    filter: TrustConnectionsFilter = {},
  ): Promise<TrustConnection[]> {
    try {
      let query = sql`
        SELECT 
          tc.id,
          tc.sender_email AS "senderEmail",
          ud.name AS "senderName",
          tc.share_name AS "shareName",
          tc.share_phone AS "sharePhone",
          tc.created_at AS "createdAt",
          tc.updated_at AS "updatedAt"
        FROM 
          trust_connections tc
        LEFT JOIN
          user_details ud ON tc.sender_email = ud.email
        WHERE 
          tc.recipient_email = ${recipientEmail}
      `

      // Apply filters
      if (filter.filterBy === "name") {
        query = sql`${query} AND tc.share_name = true`
      } else if (filter.filterBy === "phone") {
        query = sql`${query} AND tc.share_phone = true`
      } else if (filter.filterBy === "verified") {
        // This would need to join with trustscore data to check verification status
        query = sql`${query} AND (
          (tc.share_name = true AND EXISTS (
            SELECT 1 FROM user_trustscores uts 
            WHERE uts.user_id = tc.sender_email 
            AND uts.data->>'name' = 'verified'
          ))
          OR
          (tc.share_phone = true AND EXISTS (
            SELECT 1 FROM user_trustscores uts 
            WHERE uts.user_id = tc.sender_email 
            AND uts.data->>'phone_number' = 'verified'
          ))
        )`
      }

      // Apply search
      if (filter.search) {
        query = sql`${query} AND (
          tc.sender_email ILIKE ${"%" + filter.search + "%"} 
          OR ud.name ILIKE ${"%" + filter.search + "%"}
        )`
      }

      // Apply sorting
      if (filter.sortBy === "email") {
        query = sql`${query} ORDER BY tc.sender_email ASC`
      } else {
        // Default to recent
        query = sql`${query} ORDER BY tc.updated_at DESC`
      }

      const result = await query
      return result as TrustConnection[]
    } catch (error) {
      console.error("Error fetching trust connections:", error)
      throw new Error("Failed to fetch trust connections")
    }
  }

  static async getConnectionDetail(id: number, recipientEmail: string): Promise<TrustConnectionDetail | null> {
    try {
      const result = await sql`
        SELECT 
          tc.id,
          tc.sender_email AS "senderEmail",
          ud.name AS "senderName",
          tc.share_name AS "shareName",
          tc.share_phone AS "sharePhone",
          tc.created_at AS "createdAt",
          tc.updated_at AS "updatedAt",
          CASE WHEN uts.data->>'name' = 'verified' THEN true ELSE false END AS "nameVerified",
          CASE WHEN uts.data->>'phone_number' = 'verified' THEN true ELSE false END AS "phoneVerified",
          ud.name AS "nameValue",
          ud.phone AS "phoneValue"
        FROM 
          trust_connections tc
        LEFT JOIN
          user_details ud ON tc.sender_email = ud.email
        LEFT JOIN
          user_trustscores uts ON tc.sender_email = uts.user_id
        WHERE 
          tc.id = ${id}
          AND tc.recipient_email = ${recipientEmail}
      `

      if (result.length === 0) {
        return null
      }

      return result[0] as TrustConnectionDetail
    } catch (error) {
      console.error("Error fetching trust connection detail:", error)
      throw new Error("Failed to fetch trust connection detail")
    }
  }
}
