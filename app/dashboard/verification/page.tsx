"use client"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle, Clock, AlertTriangle, RefreshCw, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
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
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  /**
   * Loads verification data with enhanced error handling and user feedback
   */
  const loadVerificationData = useCallback(
    async (showRefreshFeedback = false) => {
      try {
        if (showRefreshFeedback) {
          setRefreshing(true)
        } else {
          setLoading(true)
        }
        setError(null)

        const result = await getCurrentUserVerificationData()

        if (result.success && result.data) {
          setVerificationData(result.data)

          if (showRefreshFeedback) {
            toast({
              title: "Verification data updated",
              description: "Your verification status has been refreshed.",
            })
          }
        } else {
          // Use default data as fallback
          setVerificationData(getDefaultVerificationData())

          if (result.error && !result.error.includes("not found")) {
            setError(result.error)

            if (showRefreshFeedback) {
              toast({
                title: "Update failed",
                description: "Using cached verification data.",
                variant: "destructive",
              })
            }
          }
        }
      } catch (err) {
        console.error("Failed to load verification data:", err)
        setError("Unexpected error occurred")
        setVerificationData(getDefaultVerificationData())

        if (showRefreshFeedback) {
          toast({
            title: "Connection error",
            description: "Please check your internet connection and try again.",
            variant: "destructive",
          })
        }
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [toast],
  )

  /**
   * Handle manual refresh with user feedback
   */
  const handleRefresh = useCallback(() => {
    if (!refreshing) {
      setRetryCount(0)
      loadVerificationData(true)
    }
  }, [loadVerificationData, refreshing])

  /**
   * Retry function with exponential backoff
   */
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1)
      const delay = Math.pow(2, retryCount) * 1000
      setTimeout(() => loadVerificationData(), delay)
    }
  }, [loadVerificationData, retryCount])

  /**
   * Get verification status configuration
   */
  const getStatusConfig = (item: VerificationItem) => {
    const configs = {
      VERIFIED: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        badgeVariant: "default" as const,
        badgeClass: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      PENDING: {
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        badgeVariant: "secondary" as const,
        badgeClass: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      },
      REJECTED: {
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        badgeVariant: "destructive" as const,
        badgeClass: "bg-red-100 text-red-800 hover:bg-red-100",
      },
      NOT_VERIFIED: {
        icon: Clock,
        color: "text-gray-500",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        badgeVariant: "outline" as const,
        badgeClass: "bg-gray-100 text-gray-600 hover:bg-gray-100",
      },
    }

    return configs[item.status as keyof typeof configs] || configs.NOT_VERIFIED
  }

  /**
   * Calculate verification progress with enhanced metrics
   */
  const getVerificationProgress = () => {
    const verifiedCount = verificationData.filter((item) => item.isVerified).length
    const pendingCount = verificationData.filter((item) => item.status === "PENDING").length
    const totalCount = verificationData.length
    const percentage = totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0

    return {
      verified: verifiedCount,
      pending: pendingCount,
      total: totalCount,
      percentage: Math.round(percentage),
      isComplete: verifiedCount === totalCount,
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadVerificationData()
  }, [loadVerificationData])

  const progress = getVerificationProgress()

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full" />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Critical error state
  if (error && verificationData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Verification</h1>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load verification data: {error}</span>
              {retryCount < 3 && (
                <Button variant="outline" size="sm" onClick={handleRetry} className="ml-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Verification</h1>
            <p className="text-muted-foreground">Manage your document verification status</p>
          </div>

          <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="self-start sm:self-auto">
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Updating..." : "Refresh"}
          </Button>
        </div>

        {/* Progress Overview Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold">Verification Status</CardTitle>
                <CardDescription>
                  {progress.verified} of {progress.total} documents verified
                  {progress.pending > 0 && ` • ${progress.pending} pending`}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <Badge
                  variant={progress.isComplete ? "default" : "secondary"}
                  className={progress.isComplete ? "bg-green-100 text-green-800" : ""}
                >
                  {progress.percentage}% Complete
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-2">
              <Progress
                value={progress.percentage}
                className="h-3"
                aria-label={`Verification progress: ${progress.percentage}% complete`}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>
                  {progress.verified}/{progress.total} verified
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Cards */}
        <div className="space-y-4">
          {verificationData.map((item, index) => {
            const config = getStatusConfig(item)
            const IconComponent = config.icon

            return (
              <Card
                key={`${item.document}-${index}`}
                className={`
                  transition-all duration-200 hover:shadow-md border-2
                  ${config.borderColor} ${config.bgColor}
                `}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${config.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${config.color}`} aria-hidden="true" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-foreground">{item.document}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.status === "VERIFIED" && "Document successfully verified"}
                          {item.status === "PENDING" && "Verification in progress"}
                          {item.status === "REJECTED" && "Verification failed"}
                          {item.status === "NOT_VERIFIED" && "Verification required"}
                        </p>
                      </div>
                    </div>

                    <Badge variant={config.badgeVariant} className={`${config.badgeClass} font-semibold px-3 py-1`}>
                      {item.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Fallback Data Warning */}
        {error && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Note:</strong> Displaying cached verification data. Some information may not be up to date.
            </AlertDescription>
          </Alert>
        )}

        {/* Completion Message */}
        {progress.isComplete && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Congratulations!</strong> All your documents have been verified successfully.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
