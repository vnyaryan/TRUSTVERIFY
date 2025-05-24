"use client"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorDisplay } from "@/components/ui/error-display"
import {
  getCurrentUserVerificationData,
  getDefaultVerificationData,
  type VerificationItem,
} from "@/lib/verification-service"

export default function VerificationPage() {
  const [verificationData, setVerificationData] = useState<VerificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  /**
   * Loads verification data with error handling and retry logic
   */
  const loadVerificationData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await getCurrentUserVerificationData()

      if (result.success && result.data) {
        setVerificationData(result.data)
      } else {
        // Use default data as fallback
        setVerificationData(getDefaultVerificationData())

        // Only show error if it's not just missing data
        if (result.error && !result.error.includes("not found")) {
          setError(result.error)
        }
      }
    } catch (err) {
      console.error("Failed to load verification data:", err)
      setError("Unexpected error occurred")
      setVerificationData(getDefaultVerificationData())
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Retry function with exponential backoff
   */
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      // Limit retries
      setRetryCount((prev) => prev + 1)

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, retryCount) * 1000
      setTimeout(loadVerificationData, delay)
    }
  }, [loadVerificationData, retryCount])

  /**
   * Get appropriate icon for verification status
   */
  const getStatusIcon = (item: VerificationItem) => {
    if (item.status === "VERIFIED") {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (item.status === "PENDING") {
      return <Clock className="h-5 w-5 text-yellow-600" />
    } else if (item.status === "REJECTED") {
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    } else {
      return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  /**
   * Get status color classes
   */
  const getStatusColor = (item: VerificationItem) => {
    if (item.status === "VERIFIED") {
      return "text-green-600"
    } else if (item.status === "PENDING") {
      return "text-yellow-600"
    } else if (item.status === "REJECTED") {
      return "text-red-600"
    } else {
      return "text-gray-500"
    }
  }

  /**
   * Get background color for cards
   */
  const getCardBackground = (item: VerificationItem) => {
    if (item.status === "VERIFIED") {
      return "bg-green-50 border-green-200"
    } else if (item.status === "PENDING") {
      return "bg-yellow-50 border-yellow-200"
    } else if (item.status === "REJECTED") {
      return "bg-red-50 border-red-200"
    } else {
      return "bg-white border-gray-200"
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadVerificationData()
  }, [loadVerificationData])

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Verification</h1>
        <LoadingSpinner size="lg" text="Loading verification data..." />
      </div>
    )
  }

  // Error state (only for critical errors, not missing data)
  if (error && verificationData.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Verification</h1>
        <ErrorDisplay
          title="Failed to Load Verification Data"
          message={error}
          onRetry={retryCount < 3 ? handleRetry : undefined}
          showRetry={retryCount < 3}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Verification</h1>

        {/* Show subtle error indicator if there was an issue but we have fallback data */}
        {error && (
          <div className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
            Using default data
          </div>
        )}
      </div>

      {/* Verification Status Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Verification Status</span>
          <span className="text-muted-foreground">
            {verificationData.filter((item) => item.isVerified).length} of {verificationData.length} verified
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(verificationData.filter((item) => item.isVerified).length / verificationData.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Verification Cards */}
      <div className="space-y-4">
        {verificationData.map((item, index) => (
          <div
            key={`${item.document}-${index}`}
            className={`
              border-2 p-6 rounded-lg transition-all duration-200 hover:shadow-md
              ${getCardBackground(item)}
              flex items-center justify-between
            `}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(item)}
              <span className="text-lg font-medium text-black">{item.document}</span>
            </div>

            <span className={`text-lg font-semibold ${getStatusColor(item)}`}>{item.status}</span>
          </div>
        ))}
      </div>

      {/* Data Source Indicator */}
      <div className="text-xs text-muted-foreground text-center pt-4 border-t">
        Last updated: {new Date().toLocaleString()}
        {error && " • Using fallback data"}
      </div>
    </div>
  )
}
