"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<string | null>(null)
  const [dbStatus, setDbStatus] = useState<string | null>(null)

  // Check for error parameter in URL
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(
        errorParam === "dashboard_error"
          ? "There was an error loading your dashboard. Please try logging in again."
          : "An error occurred. Please try again.",
      )
    }
  }, [searchParams])

  // Test API connection on mount
  useEffect(() => {
    async function testConnections() {
      try {
        // Test API
        const apiResponse = await fetch("/api/test")
        const apiData = await apiResponse.json()
        setApiStatus(apiData.success ? "API is working" : "API test failed")

        // Test DB
        const dbResponse = await fetch("/api/db-test")
        const dbData = await dbResponse.json()
        setDbStatus(
          dbData.success
            ? `DB connected. Users table exists: ${dbData.userTableExists}, User count: ${dbData.userCount}`
            : "DB test failed",
        )
      } catch (err) {
        console.error("Connection test error:", err)
        setApiStatus(`API test error: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    testConnections()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setDebugInfo(null)

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      setDebugInfo(`Attempting login with email: ${email}`)

      // Direct fetch instead of using the client utility
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      setDebugInfo((prev) => `${prev}\nResponse status: ${response.status}`)

      let data
      try {
        data = await response.json()
        setDebugInfo((prev) => `${prev}\nResponse data: ${JSON.stringify(data)}`)
      } catch (jsonError) {
        setDebugInfo(
          (prev) =>
            `${prev}\nError parsing response: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`,
        )
        throw new Error("Invalid response from server")
      }

      if (data.success) {
        setDebugInfo((prev) => `${prev}\nLogin successful, redirecting...`)
        router.push("/dashboard")
        router.refresh()
      } else {
        setDebugInfo((prev) => `${prev}\nLogin failed: ${data.message}`)
        setError(data.message || "Login failed. Please try again.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setDebugInfo((prev) => `${prev}\nError: ${err instanceof Error ? err.message : String(err)}`)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Connection status */}
        <div className="mb-4 text-xs">
          <div className={`p-1 rounded ${apiStatus?.includes("working") ? "bg-green-100" : "bg-yellow-100"}`}>
            API Status: {apiStatus || "Testing..."}
          </div>
          <div className={`p-1 mt-1 rounded ${dbStatus?.includes("connected") ? "bg-green-100" : "bg-yellow-100"}`}>
            DB Status: {dbStatus || "Testing..."}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" autoComplete="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Debug info - always show in this version */}
        <div className="mt-4 p-2 bg-gray-100 text-xs font-mono whitespace-pre-wrap rounded">
          {debugInfo || "No debug info yet"}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
