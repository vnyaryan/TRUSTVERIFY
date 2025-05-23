import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { getSession } from "@/app/actions/auth-actions"
import { getUserDetails } from "@/lib/session"
import { redirect } from "next/navigation"
import { ErrorBoundary } from "@/components/error-boundary"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Get the current session
    const { isLoggedIn, email } = await getSession()

    if (!isLoggedIn || !email) {
      redirect("/login")
    }

    // Get user details from the database
    const userDetails = await getUserDetails(email)

    if (!userDetails) {
      redirect("/login")
    }

    // Format the user's name
    const displayName =
      userDetails.firstName && userDetails.lastName
        ? `${userDetails.firstName} ${userDetails.lastName}`
        : userDetails.firstName || userDetails.lastName || email.split("@")[0]

    // User data to pass to components
    const userData = {
      name: displayName,
      email: userDetails.email,
      image: "/abstract-user-avatar.png", // Default image
    }

    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader>
          <UserAccountNav user={userData} />
        </DashboardHeader>
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <DashboardNav />
          </aside>
          <main className="flex w-full flex-col overflow-hidden p-4 md:py-8">
            <ErrorBoundary fallback={<p>Something went wrong with the dashboard. Please try refreshing the page.</p>}>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout error:", error)
    redirect("/login?error=dashboard_error")
  }
}
