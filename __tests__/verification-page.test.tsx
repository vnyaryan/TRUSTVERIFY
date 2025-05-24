import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import VerificationPage from "@/app/dashboard/verification/page"

// Mock the verification service
jest.mock("@/lib/verification-service", () => ({
  getCurrentUserVerificationData: jest.fn(),
  getDefaultVerificationData: jest.fn(() => [{ document: "PAN CARD", status: "NOT VERIFIED", isVerified: false }]),
}))

describe("Verification Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should show loading state initially", () => {
    const { getCurrentUserVerificationData } = require("@/lib/verification-service")
    getCurrentUserVerificationData.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(<VerificationPage />)

    expect(screen.getByText("Loading verification data...")).toBeInTheDocument()
  })

  it("should display verification data when loaded successfully", async () => {
    const { getCurrentUserVerificationData } = require("@/lib/verification-service")
    getCurrentUserVerificationData.mockResolvedValue({
      success: true,
      data: [
        { document: "PAN CARD", status: "VERIFIED", isVerified: true },
        { document: "AADHAAR CARD", status: "PENDING", isVerified: false },
      ],
    })

    render(<VerificationPage />)

    await waitFor(() => {
      expect(screen.getByText("PAN CARD")).toBeInTheDocument()
      expect(screen.getByText("VERIFIED")).toBeInTheDocument()
      expect(screen.getByText("AADHAAR CARD")).toBeInTheDocument()
      expect(screen.getByText("PENDING")).toBeInTheDocument()
    })
  })

  it("should show error state when data loading fails", async () => {
    const { getCurrentUserVerificationData } = require("@/lib/verification-service")
    getCurrentUserVerificationData.mockResolvedValue({
      success: false,
      error: "Network error",
    })

    render(<VerificationPage />)

    await waitFor(() => {
      expect(screen.getByText("Failed to Load Verification Data")).toBeInTheDocument()
      expect(screen.getByText("Network error")).toBeInTheDocument()
    })
  })

  it("should allow retry on error", async () => {
    const user = userEvent.setup()
    const { getCurrentUserVerificationData } = require("@/lib/verification-service")

    getCurrentUserVerificationData
      .mockResolvedValueOnce({
        success: false,
        error: "Network error",
      })
      .mockResolvedValueOnce({
        success: true,
        data: [{ document: "PAN CARD", status: "VERIFIED", isVerified: true }],
      })

    render(<VerificationPage />)

    await waitFor(() => {
      expect(screen.getByText("Try Again")).toBeInTheDocument()
    })

    await user.click(screen.getByText("Try Again"))

    await waitFor(() => {
      expect(screen.getByText("PAN CARD")).toBeInTheDocument()
      expect(screen.getByText("VERIFIED")).toBeInTheDocument()
    })
  })

  it("should show progress indicator", async () => {
    const { getCurrentUserVerificationData } = require("@/lib/verification-service")
    getCurrentUserVerificationData.mockResolvedValue({
      success: true,
      data: [
        { document: "PAN CARD", status: "VERIFIED", isVerified: true },
        { document: "AADHAAR CARD", status: "NOT VERIFIED", isVerified: false },
      ],
    })

    render(<VerificationPage />)

    await waitFor(() => {
      expect(screen.getByText("1 of 2 verified")).toBeInTheDocument()
    })
  })
})
