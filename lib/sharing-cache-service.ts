import type { SharingPreference, LocalStorageCache } from "@/types/sharing"

export class SharingCacheService {
  private static readonly CACHE_KEY = "sharing_preferences_cache"
  private static readonly CACHE_EXPIRY_HOURS = 24

  // Get cached preferences
  static getCachedPreferences(userId: string): SharingPreference[] | null {
    try {
      if (typeof window === "undefined") return null

      const cached = localStorage.getItem(`${this.CACHE_KEY}_${userId}`)
      if (!cached) return null

      const cacheData: LocalStorageCache = JSON.parse(cached)

      // Check if cache is expired
      const lastSync = new Date(cacheData.lastSync)
      const now = new Date()
      const hoursDiff = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60)

      if (hoursDiff > this.CACHE_EXPIRY_HOURS) {
        this.clearCache(userId)
        return null
      }

      return cacheData.preferences
    } catch (error) {
      console.error("Error reading cache:", error)
      return null
    }
  }

  // Save preferences to cache
  static setCachedPreferences(userId: string, preferences: SharingPreference[]): void {
    try {
      if (typeof window === "undefined") return

      const cacheData: LocalStorageCache = {
        preferences,
        lastSync: new Date().toISOString(),
      }

      localStorage.setItem(`${this.CACHE_KEY}_${userId}`, JSON.stringify(cacheData))
    } catch (error) {
      console.error("Error saving to cache:", error)
    }
  }

  // Update single preference in cache
  static updateCachedPreference(userId: string, updatedPreference: SharingPreference): void {
    try {
      const cached = this.getCachedPreferences(userId)
      if (!cached) return

      const index = cached.findIndex((p) => p.recipientEmail === updatedPreference.recipientEmail)

      if (index >= 0) {
        cached[index] = updatedPreference
      } else {
        cached.push(updatedPreference)
      }

      this.setCachedPreferences(userId, cached)
    } catch (error) {
      console.error("Error updating cache:", error)
    }
  }

  // Remove preference from cache
  static removeCachedPreference(userId: string, recipientEmail: string): void {
    try {
      const cached = this.getCachedPreferences(userId)
      if (!cached) return

      const filtered = cached.filter((p) => p.recipientEmail !== recipientEmail)
      this.setCachedPreferences(userId, filtered)
    } catch (error) {
      console.error("Error removing from cache:", error)
    }
  }

  // Clear all cache for user
  static clearCache(userId: string): void {
    try {
      if (typeof window === "undefined") return
      localStorage.removeItem(`${this.CACHE_KEY}_${userId}`)
    } catch (error) {
      console.error("Error clearing cache:", error)
    }
  }

  // Check if cache exists and is valid
  static isCacheValid(userId: string): boolean {
    const cached = this.getCachedPreferences(userId)
    return cached !== null
  }

  // Force sync - clear cache to force fresh fetch
  static forceSync(userId: string): void {
    this.clearCache(userId)
  }
}
