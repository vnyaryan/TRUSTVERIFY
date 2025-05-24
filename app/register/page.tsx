import { SignupForm } from "@/components/signup-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Join TrustVerify
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Start building trust in your relationships today</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
