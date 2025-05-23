"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: "pass" | "fail" | "pending"
  message: string
}

export function LogoutTester() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runLogoutTests = async () => {
    setIsRunning(true)
    const results: TestResult[] = []

    // Test 1: Check if logout API is accessible
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (response.ok) {
        results.push({
          name: "Logout API Accessibility",
          status: "pass",
          message: "Logout API is accessible and responding",
        })
      } else {
        results.push({
          name: "Logout API Accessibility",
          status: "fail",
          message: `API returned status: ${response.status}`,
        })
      }
    } catch (error) {
      results.push({
        name: "Logout API Accessibility",
        status: "fail",
        message: `API request failed: ${error}`,
      })
    }

    // Test 2: Check session cookie presence before logout
    const sessionBefore = document.cookie.includes("trustverify_session")
    results.push({
      name: "Session Cookie Before Logout",
      status: sessionBefore ? "pass" : "fail",
      message: sessionBefore ? "Session cookie found" : "No session cookie found",
    })

    // Test 3: Perform logout and check response
    try {
      const logoutResponse = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      const logoutData = await logoutResponse.json()

      if (logoutResponse.ok && logoutData.success) {
        results.push({
          name: "Logout Response",
          status: "pass",
          message: "Logout API returned success response",
        })
      } else {
        results.push({
          name: "Logout Response",
          status: "fail",
          message: `Logout failed: ${logoutData.message || "Unknown error"}`,
        })
      }
    } catch (error) {
      results.push({
        name: "Logout Response",
        status: "fail",
        message: `Logout request failed: ${error}`,
      })
    }

    // Test 4: Check if session cookie is cleared after logout
    setTimeout(() => {
      const sessionAfter = document.cookie.includes("trustverify_session")
      results.push({
        name: "Session Cookie After Logout",
        status: !sessionAfter ? "pass" : "fail",
        message: !sessionAfter ? "Session cookie successfully cleared" : "Session cookie still present",
      })

      // Test 5: Check localStorage clearance
      const localStorageEmpty = localStorage.length === 0
      results.push({
        name: "LocalStorage Clearance",
        status: localStorageEmpty ? "pass" : "fail",
        message: localStorageEmpty ? "LocalStorage cleared" : "LocalStorage still contains data",
      })

      // Test 6: Check sessionStorage clearance
      const sessionStorageEmpty = sessionStorage.length === 0
      results.push({
        name: "SessionStorage Clearance",
        status: sessionStorageEmpty ? "pass" : "fail",
        message: sessionStorageEmpty ? "SessionStorage cleared" : "SessionStorage still contains data",
      })

      setTestResults([...results])
      setIsRunning(false)
    }, 1000)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      pass: "default",
      fail: "destructive",
      pending: "secondary",
    } as const

    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Logout Functionality Tester</CardTitle>
        <CardDescription>Test the logout functionality to ensure secure session management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runLogoutTests} disabled={isRunning} className="w-full">
          {isRunning ? "Running Tests..." : "Run Logout Tests"}
        </Button>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <span className="font-medium">{result.name}</span>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(result.status)}</div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Test Summary:</h4>
              <div className="text-sm space-y-1">
                {testResults.map((result, index) => (
                  <div key={index}>
                    <strong>{result.name}:</strong> {result.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
