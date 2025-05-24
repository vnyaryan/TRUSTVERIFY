"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail, Lock, Calendar, Users, Database } from "lucide-react"
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateDateOfBirth,
  validateSex,
  getPasswordStrength,
} from "@/lib/form-validation"
import type { SignupFormData, ValidationErrors } from "@/types/signup"

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    dateOfBirth: "",
    sex: "",
    firstName: "",
    lastName: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [submitError, setSubmitError] = useState<string>("")
  const [successData, setSuccessData] = useState<any>(null)

  const handleFieldChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("")
    }
  }

  const handleBlur = (field: keyof SignupFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    // Validate field on blur
    let error: string | null = null

    switch (field) {
      case "email":
        error = validateEmail(formData.email)
        break
      case "password":
        error = validatePassword(formData.password)
        break
      case "firstName":
        error = validateFirstName(formData.firstName)
        break
      case "lastName":
        error = validateLastName(formData.lastName)
        break
      case "dateOfBirth":
        error = validateDateOfBirth(formData.dateOfBirth)
        break
      case "sex":
        error = validateSex(formData.sex)
        break
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Client-side validation first
      const clientErrors: ValidationErrors = {}

      const emailError = validateEmail(formData.email)
      if (emailError) clientErrors.email = emailError

      const passwordError = validatePassword(formData.password)
      if (passwordError) clientErrors.password = passwordError

      const firstNameError = validateFirstName(formData.firstName)
      if (firstNameError) clientErrors.firstName = firstNameError

      const lastNameError = validateLastName(formData.lastName)
      if (lastNameError) clientErrors.lastName = lastNameError

      const dobError = validateDateOfBirth(formData.dateOfBirth)
      if (dobError) clientErrors.dateOfBirth = dobError

      const sexError = validateSex(formData.sex)
      if (sexError) clientErrors.sex = sexError

      if (Object.keys(clientErrors).length > 0) {
        setErrors(clientErrors)
        setIsSubmitting(false)
        return
      }

      // Submit to API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          sex: formData.sex,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Success - show success message
        setSuccessData(result.data)
        setIsSuccess(true)
      } else {
        // Handle API errors
        if (result.errors) {
          // Validation errors from server
          setErrors(result.errors)
        } else {
          // General error message
          setSubmitError(result.message || "An error occurred during signup")
        }
      }
    } catch (error) {
      console.error("Signup error:", error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500"
    if (score <= 3) return "bg-yellow-500"
    if (score <= 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return "Weak"
    if (score <= 3) return "Fair"
    if (score <= 4) return "Good"
    return "Strong"
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Account Created Successfully! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              Welcome to TrustVerify,{" "}
              <strong>
                {successData?.firstName} {successData?.lastName}
              </strong>
              !
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="font-medium">Account Details Saved</span>
              </div>
              <div className="text-left space-y-1">
                <p>
                  <strong>Name:</strong> {successData?.firstName} {successData?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {successData?.email}
                </p>
                <p>
                  <strong>Age:</strong> {successData?.age} years old
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={() => (window.location.href = "/login")} className="w-full">
                Go to Login
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setSuccessData(null)
                  setFormData({
                    email: "",
                    password: "",
                    dateOfBirth: "",
                    sex: "",
                    firstName: "",
                    lastName: "",
                  })
                  setErrors({})
                  setTouched({})
                  setSubmitError("")
                }}
                className="w-full"
              >
                Create Another Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
        <p className="text-muted-foreground">Join TrustVerify and save your details securely</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Submit Error Display */}
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {submitError}
              </p>
            </div>
          )}

          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              className={errors.firstName ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.firstName}
              </p>
            )}
            {!errors.firstName && formData.firstName && touched.firstName && (
              <p className="text-green-500 text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                First name looks good
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Last Name *
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              className={errors.lastName ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.lastName}
              </p>
            )}
            {!errors.lastName && formData.lastName && touched.lastName && (
              <p className="text-green-500 text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Last name looks good
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={errors.email ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
            {!errors.email && formData.email && touched.email && (
              <p className="text-green-500 text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Valid email address
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={errors.password ? "border-red-500 focus:border-red-500 pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{getPasswordStrengthText(passwordStrength.score)}</span>
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <div className="text-xs text-muted-foreground">Missing: {passwordStrength.feedback.join(", ")}</div>
                )}
              </div>
            )}

            {errors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
              onBlur={() => handleBlur("dateOfBirth")}
              className={errors.dateOfBirth ? "border-red-500 focus:border-red-500" : ""}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          {/* Sex Field */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Sex *
            </Label>
            <Select onValueChange={(value) => handleFieldChange("sex", value)} value={formData.sex}>
              <SelectTrigger className={errors.sex ? "border-red-500 focus:border-red-500" : ""}>
                <SelectValue placeholder="Select your sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.sex}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving to Database...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Create Account
              </span>
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => (window.location.href = "/login")}
            >
              Sign in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
