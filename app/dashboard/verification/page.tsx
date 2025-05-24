"use client"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"
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
      setRetryCount((prev) => prev + 1)
      const delay = Math.pow(2, retryCount) * 1000
      setTimeout(loadVerificationData, delay)
    }
  }, [loadVerificationData, retryCount])

  /**
   * Get appropriate icon for verification status
   */
  const getStatusIcon = (item: VerificationItem) => {
    if (item.status === "VERIFIED") {
      return <CheckCircle className="h-6 w-6 text-green-600" />
    } else if (item.status === "PENDING") {
      return <Clock className="h-6 w-6 text-yellow-600" />
    } else if (item.status === "REJECTED") {
      return <AlertTriangle className="h-6 w-6 text-red-600" />
    } else {
      return <Clock className="h-6 w-6 text-gray-400" />
    }
  }

  /**
   * Get status color classes
   */
  const getStatusColor = (item: VerificationItem) => {
    if (item.status === "VERIFIED") {
      return "text-green-600 font-semibold"
    } else if (item.status === "PENDING") {
      return "text-yellow-600 font-semibold"
    } else if (item.status === "REJECTED") {
      return "text-red-600 font-semibold"
    } else {
      return "text-gray-500 font-semibold"
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
      return "bg-gray-50 border-gray-200"
    }
  }

  /**
   * Calculate verification progress
   */
  const getVerificationProgress = () => {
    const verifiedCount = verificationData.filter((item) => item.isVerified).length
    const totalCount = verificationData.length
    const percentage = totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0

    return {
      verified: verifiedCount,
      total: totalCount,
      percentage: Math.round(percentage),
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadVerificationData()
  }, [loadVerificationData])

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verification</h1>
        <LoadingSpinner size="lg" text="Loading verification data..." />
      </div>
    )
  }

  // Error state (only for critical errors, not missing data)
  if (error && verificationData.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verification</h1>
        <ErrorDisplay
          title="Failed to Load Verification Data"
          message={error}
          onRetry={retryCount < 3 ? handleRetry : undefined}
          showRetry={retryCount < 3}
        />
      </div>
    )
  }

  const progress = getVerificationProgress()

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Verification</h1>

      {/* Verification Status Summary Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Verification Status</span>
          <span className="text-sm text-gray-500">
            {progress.verified} of {progress.total} verified
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Verification Cards */}
      <div className="space-y-4">
        {verificationData.map((item, index) => (
          <div
            key={`${item.document}-${index}`}
            className={`
              border rounded-lg p-6 transition-all duration-200 hover:shadow-md
              ${getCardBackground(item)}
              flex items-center justify-between
            `}
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(item)}
              <span className="text-lg font-medium text-gray-900">{item.document}</span>
            </div>

            <span className={`text-lg ${getStatusColor(item)}`}>{item.status}</span>
          </div>
        ))}
      </div>

      {/* Subtle Error Indicator (if using fallback data) */}
      {error && (
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Using default verification data
          </div>
        </div>
      )}
    </div>
  )
}
