import { fetchVerificationData, getCurrentUserVerificationData } from "@/lib/verification-service"

// Mock fetch globally
global.fetch = jest.fn()

// Mock auth module
jest.mock("@/lib/auth", () => ({
  getCurrentUser: jest.fn(),
}))

describe("Verification Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  describe("fetchVerificationData", () => {
    it("should fetch and parse valid JSON data", async () => {
      const mockData = {
        pan_card: "verified",
        aadhaar_card: "pending",
        passport: "not_verified",
      }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await fetchVerificationData("testuser")

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(3)
      expect(result.data?.[0].document).toBe("PAN CARD")
      expect(result.data?.[0].status).toBe("VERIFIED")
    })

    it("should handle file not found error", async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      })

      const result = await fetchVerificationData("nonexistent")

      expect(result.success).toBe(false)
      expect(result.error).toBe("Verification data not found")
    })

    it("should sanitize malicious usernames", async () => {
      const result = await fetchVerificationData("../../../etc/passwd")

      expect(result.success).toBe(false)
      expect(result.error).toBe("Invalid username format")
    })

    it("should handle invalid JSON", async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON")
        },
      })

      const result = await fetchVerificationData("testuser")

      expect(result.success).toBe(false)
      expect(result.error).toBe("Invalid data format")
    })

    it("should handle network errors", async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new TypeError("Network error"))

      const result = await fetchVerificationData("testuser")

      expect(result.success).toBe(false)
      expect(result.error).toBe("Network connection error")
    })

    it("should handle timeout errors", async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(Object.assign(new Error("Timeout"), { name: "AbortError" }))

      const result = await fetchVerificationData("testuser")

      expect(result.success).toBe(false)
      expect(result.error).toBe("Request timeout")
    })
  })

  describe("getCurrentUserVerificationData", () => {
    it("should return error when user not authenticated", async () => {
      const { getCurrentUser } = require("@/lib/auth")
      getCurrentUser.mockReturnValue(null)

      const result = await getCurrentUserVerificationData()

      expect(result.success).toBe(false)
      expect(result.error).toBe("User not authenticated")
    })

    it("should fetch data for authenticated user", async () => {
      const { getCurrentUser } = require("@/lib/auth")
      getCurrentUser.mockReturnValue({ username: "testuser" })

      const mockData = { pan_card: "verified" }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await getCurrentUserVerificationData()

      expect(result.success).toBe(true)
      expect(fetch).toHaveBeenCalledWith("/data/testuser.json", expect.any(Object))
    })
  })
})
