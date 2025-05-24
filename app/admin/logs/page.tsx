"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AuthLogEntry {
  timestamp: string
  eventType: "login_success" | "login_failure" | "signup_success" | "signup_failure"
  email: string
  ipAddress?: string
  userAgent?: string
  errorMessage?: string
  additionalData?: Record<string, any>
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuthLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/logs")
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true
    return log.eventType.includes(filter)
  })

  const getEventBadge = (eventType: string) => {
    const variants = {
      login_success: "default",
      login_failure: "destructive",
      signup_success: "secondary",
      signup_failure: "outline",
    } as const

    return (
      <Badge variant={variants[eventType as keyof typeof variants] || "outline"}>
        {eventType.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  if (loading) {
    return <div className="p-8">Loading logs...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Authentication Logs</h1>

        <div className="flex gap-2 mb-4">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Events
          </Button>
          <Button variant={filter === "success" ? "default" : "outline"} onClick={() => setFilter("success")}>
            Success
          </Button>
          <Button variant={filter === "failure" ? "default" : "outline"} onClick={() => setFilter("failure")}>
            Failures
          </Button>
          <Button variant={filter === "login" ? "default" : "outline"} onClick={() => setFilter("login")}>
            Logins
          </Button>
          <Button variant={filter === "signup" ? "default" : "outline"} onClick={() => setFilter("signup")}>
            Signups
          </Button>
        </div>

        <Button onClick={fetchLogs} variant="outline">
          Refresh Logs
        </Button>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getEventBadge(log.eventType)}
                    <span className="text-sm font-mono">{log.email}</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>IP: {log.ipAddress}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {log.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                  <p className="text-red-800 text-sm">{log.errorMessage}</p>
                </div>
              )}

              {log.userAgent && (
                <div className="text-xs text-muted-foreground mb-2">
                  <strong>User Agent:</strong> {log.userAgent}
                </div>
              )}

              {log.additionalData && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground">Additional Data</summary>
                  <pre className="mt-2 bg-gray-50 p-2 rounded overflow-auto">
                    {JSON.stringify(log.additionalData, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredLogs.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No logs found for the selected filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
