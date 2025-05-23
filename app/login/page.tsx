import { getSession } from "@/app/actions/auth-actions"
import { redirect } from "next/navigation"
import LoginForm from "./login-form"

export default async function LoginPage() {
  // Check if user is already logged in
  const { isLoggedIn } = await getSession()

  if (isLoggedIn) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
      <LoginForm />
    </div>
  )
}
