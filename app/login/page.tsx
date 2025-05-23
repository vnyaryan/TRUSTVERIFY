import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "./login-form"

export default function LoginPage() {
  // Check if user is already logged in by checking for session cookie
  const sessionCookie = cookies().get("session")

  // If user is already logged in, redirect to dashboard
  if (sessionCookie) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
      <LoginForm />
    </div>
  )
}
