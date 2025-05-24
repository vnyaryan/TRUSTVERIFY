"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail, Lock, Calendar, Users } from "lucide-react"
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateDateOfBirth,
  validateSex,
  calculateAge,
  getPasswordStrength,
  validateAllFields,
} from "@/lib/form-validation"
import type { SignupFormData, ValidationErrors } from "@/types/signup"

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    dateOfBirth: "",
    sex: "",
    age: 0,
    username: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  // Calculate age whenever date of birth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth)
      setFormData((prev) => ({ ...prev, age }))
    }
  }, [formData.dateOfBirth])

  const handleFieldChange = (field: keyof SignupFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
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
      case "username":
        error = validateUsername(formData.username)
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

    // Validate all fields
    const validationErrors = validateAllFields(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    setIsSuccess(true)
    setIsSubmitting(false)
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
            <p className="text-muted-foreground mb-6">
              Welcome to TrustVerify! Your account has been created and you can now start building trust in your
              relationships.
            </p>
            <div className="space-y-3">
              <Button onClick={() => (window.location.href = "/login")} className="w-full">
                Go to Login
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setFormData({
                    email: "",
                    password: "",
                    dateOfBirth: "",
                    sex: "",
                    age: 0,
                    username: "",
                  })
                  setErrors({})
                  setTouched({})
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
        <p className="text-muted-foreground">Join TrustVerify to build trust in your relationships</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Username *
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a unique username"
              value={formData.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              onBlur={() => handleBlur("username")}
              className={errors.username ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                {errors.username}
              </p>
            )}
            {!errors.username && formData.username && touched.username && (
              <p className="text-green-500 text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Username is available
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

          {/* Age Display */}
          <div className="space-y-2">
            <Label>Age</Label>
            <div className="p-3 bg-muted rounded-md border">
              <span className="text-sm">
                {formData.age > 0 ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {formData.age} years old
                  </span>
                ) : (
                  <span className="text-muted-foreground">Enter date of birth to calculate age</span>
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              "Create Account"
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
