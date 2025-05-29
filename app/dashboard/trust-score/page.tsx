"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { getCurrentUserTrustScoreData, type TrustScoreItem } from "@/lib/trustscore-service"

interface TrustScoreState {
  loading: boolean
  data: TrustScoreItem[]
  overallScore: number
  error: string | null
  source: "user" | "default" | "fallback" | null
}

function TrustScoreTable({ data }: { data: TrustScoreItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-6 font-semibold text-foreground bg-muted/50">VERIFICATION-DETAILS</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground bg-muted/50">VERIFICATION-STATUS</th>
            <th className="text-left py-4 px-6 font-semibold text-foreground bg-muted/50">TRUSCORE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="py-4 px-6 font-medium text-foreground">{item.detail}</td>
              <td className="py-4 px-6">
                <Badge
                  variant={item.isVerified ? "default" : "destructive"}
                  className={`font-medium ${
                    item.isVerified
                      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {item.isVerified ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                  {item.status}
                </Badge>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`text-2xl font-bold ${
                    item.score === 1 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TrustScoreTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 py-4 px-6 bg-muted/50">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="grid grid-cols-3 gap-4 py-4 px-6 border-b border-border">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-8" />
        </div>
      ))}
    </div>
  )
}

export default function TrustScorePage() {
  const [state, setState] = useState<TrustScoreState>({
    loading: true,
    data: [],
    overallScore: 0,
    error: null,
    source: null,
  })

  useEffect(() => {
    async function loadTrustScoreData() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const result = await getCurrentUserTrustScoreData()

        if (result.success && result.data) {
          setState({
            loading: false,
            data: result.data,
            overallScore: result.overallScore || 0,
            error: null,
            source: result.source || null,
          })
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result.error || "Failed to load trust score data",
          }))
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "An unexpected error occurred",
        }))
      }
    }

    loadTrustScoreData()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trust Score</h1>
      </div>

      {/* Overall Score Card */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Your Trust Score Overview
          </CardTitle>
          <CardDescription>Your trust score is calculated based on verified personal information</CardDescription>
        </CardHeader>
        <CardContent>
          {state.loading ? (
            <div className="flex items-center justify-center py-8">
              <Skeleton className="h-16 w-32" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-6xl font-bold ${
                    state.overallScore >= 70
                      ? "text-green-600 dark:text-green-400"
                      : state.overallScore >= 40
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {state.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground mt-2">Overall Trust Score</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trust Score Table */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Trust Score Details</CardTitle>
          <CardDescription>Detailed breakdown of your verification status and scores</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {state.loading ? (
            <TrustScoreTableSkeleton />
          ) : state.error ? (
            <div className="p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            </div>
          ) : (
            <TrustScoreTable data={state.data} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
