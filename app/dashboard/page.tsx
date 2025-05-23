"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession } from "@/app/actions/auth-actions"
import { getUserDetails } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Suspense } from "react"

// Loading component for the dashboard
function DashboardLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Error component for the dashboard
function DashboardError({ error }: { error: Error }) {
  return (
    <div className="container mx-auto py-10">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Something went wrong</CardTitle>
          <CardDescription>We encountered an error loading your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {error.message || "Please try refreshing the page or contact support if the issue persists."}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()} variant="outline">
              Refresh Page
            </Button>
            <Button onClick={() => (window.location.href = "/")} variant="ghost">
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard content component
async function DashboardContent() {
  try {
    // Get the current session
    const { isLoggedIn, email } = await getSession()

    if (!isLoggedIn || !email) {
      redirect("/login")
    }

    // Get detailed user information
    const userDetails = await getUserDetails(email)

    if (!userDetails) {
      throw new Error("Unable to retrieve user details. Please try logging in again.")
    }

    const displayName =
      userDetails.firstName && userDetails.lastName
        ? `${userDetails.firstName} ${userDetails.lastName}`
        : userDetails.firstName || userDetails.lastName || email.split("@")[0]

    return (
      <div className="container mx-auto py-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {displayName}!</h1>
            <p className="text-muted-foreground">Here's an overview of your TrustVerify account</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span> {displayName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {userDetails.email}
                </div>
                {userDetails.phoneNumber && (
                  <div>
                    <span className="font-medium">Phone:</span> {userDetails.phoneNumber}
                  </div>
                )}
                {userDetails.gender && (
                  <div>
                    <span className="font-medium">Gender:</span> {userDetails.gender}
                  </div>
                )}
                {userDetails.dateOfBirth && (
                  <div>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {new Date(userDetails.dateOfBirth).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Status</CardTitle>
                <CardDescription>Your current verification level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-orange-600">Pending</div>
                  <p className="text-sm text-muted-foreground mt-2">Complete your profile to start verification</p>
                  <Button className="mt-4" size="sm">
                    Start Verification
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trust Score</CardTitle>
                <CardDescription>Your current trust rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-blue-600">--</div>
                  <p className="text-sm text-muted-foreground mt-2">Complete verification to get your score</p>
                  <Button variant="outline" className="mt-4" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">📝</span>
                  Complete Profile
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">🔍</span>
                  Start Verification
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">📊</span>
                  View Trust Score
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <span className="text-lg mb-1">🔗</span>
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard error:", error)
    return <DashboardError error={error instanceof Error ? error : new Error("Unknown error occurred")} />
  }
}

// Main dashboard page component
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
