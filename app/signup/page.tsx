import { getSession } from "@/app/actions/auth-actions"
import { redirect } from "next/navigation"
import SignupForm from "./signup-form"

export default async function SignupPage() {
  // Check if user is already logged in
  const { isLoggedIn } = await getSession()

  if (isLoggedIn) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Join Our Community</h1>
      <SignupForm />
    </div>
  )
}
