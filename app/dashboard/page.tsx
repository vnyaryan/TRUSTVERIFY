import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession } from "@/app/actions/auth-actions"
import { getUserDetails } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { isLoggedIn, email } = await getSession()

  if (!isLoggedIn || !email) {
    redirect("/login")
  }

  // Get detailed user information
  const userDetails = await getUserDetails(email)

  if (!userDetails) {
    redirect("/login")
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
}
