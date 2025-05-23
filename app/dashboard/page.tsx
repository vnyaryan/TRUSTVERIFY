import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSession, logout } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const { isLoggedIn, email } = await getSession()

  if (!isLoggedIn) {
    return null // This should be handled by middleware, but just in case
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>Welcome to your account dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You are logged in as: <strong>{email}</strong>
          </p>
          <form action={logout}>
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
