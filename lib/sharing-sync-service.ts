import { SharingCacheService } from "./sharing-cache-service"
import type { SharingPreference, ApiResponse } from "@/types/sharing"

export class SharingSyncService {
  // Fetch preferences with cache fallback
  static async getPreferences(userId: string, forceRefresh = false): Promise<SharingPreference[]> {
    try {
      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = SharingCacheService.getCachedPreferences(userId)
        if (cached) {
          console.log("Returning cached preferences")
          return cached
        }
      }

      // Fetch from API
      console.log("Fetching preferences from API")
      const response = await fetch(`/api/sharing/preferences?userId=${userId}`)
      const result: ApiResponse<SharingPreference[]> = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch preferences")
      }

      // Cache the results
      SharingCacheService.setCachedPreferences(userId, result.data)

      return result.data
    } catch (error) {
      console.error("Error in getPreferences:", error)

      // Fallback to cache if API fails
      const cached = SharingCacheService.getCachedPreferences(userId)
      if (cached) {
        console.log("API failed, returning cached data")
        return cached
      }

      throw error
    }
  }

  // Save preference with optimistic updates
  static async savePreference(preference: SharingPreference): Promise<SharingPreference> {
    try {
      // Optimistic update to cache
      SharingCacheService.updateCachedPreference(preference.userId, preference)

      // Save to API
      const response = await fetch("/api/sharing/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      })

      const result: ApiResponse<SharingPreference> = await response.json()

      if (!result.success || !result.data) {
        // Revert optimistic update on failure
        SharingCacheService.removeCachedPreference(preference.userId, preference.recipientEmail)
        throw new Error(result.error || "Failed to save preference")
      }

      // Update cache with server response
      SharingCacheService.updateCachedPreference(preference.userId, result.data)

      return result.data
    } catch (error) {
      console.error("Error in savePreference:", error)
      throw error
    }
  }

  // Delete preference with optimistic updates
  static async deletePreference(userId: string, recipientEmail: string): Promise<void> {
    try {
      // Optimistic update to cache
      SharingCacheService.removeCachedPreference(userId, recipientEmail)

      // Delete from API
      const response = await fetch(`/api/sharing/preferences?userId=${userId}&recipientEmail=${recipientEmail}`, {
        method: "DELETE",
      })

      const result: ApiResponse<null> = await response.json()

      if (!result.success) {
        // Revert optimistic update on failure - need to refetch
        await this.getPreferences(userId, true)
        throw new Error(result.error || "Failed to delete preference")
      }
    } catch (error) {
      console.error("Error in deletePreference:", error)
      throw error
    }
  }

  // Sync cache with server
  static async syncWithServer(userId: string): Promise<void> {
    try {
      await this.getPreferences(userId, true)
      console.log("Cache synced with server")
    } catch (error) {
      console.error("Error syncing with server:", error)
      throw error
    }
  }

  // Check if user is online
  static isOnline(): boolean {
    return typeof navigator !== "undefined" ? navigator.onLine : true
  }

  // Queue operations for offline mode (future enhancement)
  static queueOfflineOperation(operation: any): void {
    // Implementation for offline queue
    console.log("Queued offline operation:", operation)
  }
}
