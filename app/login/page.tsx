import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Login | TrustVerify",
  description: "Sign in to your TrustVerify account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Sign in to your TrustVerify account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
