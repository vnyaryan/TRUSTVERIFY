import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Immediately redirect to profile page since Overview is removed
  redirect("/dashboard/profile")
}
