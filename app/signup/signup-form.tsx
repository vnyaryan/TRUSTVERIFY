"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signup } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    try {
      const response = await signup(formData)

      if (response.success) {
        // Redirect to dashboard on successful signup
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(response.message)
        if (response.fieldErrors) {
          setFieldErrors(response.fieldErrors)
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-red-500">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              autoComplete="username"
              required
              aria-invalid={!!fieldErrors.username}
              aria-describedby={fieldErrors.username ? "username-error" : undefined}
            />
            {fieldErrors.username && (
              <p id="username-error" className="text-sm text-red-500">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                aria-invalid={!!fieldErrors.password}
                aria-describedby={fieldErrors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-sm text-red-500">
                {fieldErrors.password}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                aria-invalid={!!fieldErrors.confirmPassword}
                aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p id="confirm-password-error" className="text-sm text-red-500">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              aria-invalid={!!fieldErrors.dateOfBirth}
              aria-describedby={fieldErrors.dateOfBirth ? "dob-error" : undefined}
            />
            {fieldErrors.dateOfBirth && (
              <p id="dob-error" className="text-sm text-red-500">
                {fieldErrors.dateOfBirth}
              </p>
            )}
            <p className="text-xs text-gray-500">You must be at least 18 years old to register.</p>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup name="sex" defaultValue="male" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            {fieldErrors.sex && <p className="text-sm text-red-500">{fieldErrors.sex}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
