import type { SignupFormData, ValidationErrors, PasswordStrength } from "@/types/signup"

// Email validation
export function validateEmail(email: string): string | null {
  if (!email) {
    return "Email is required"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  if (email.length > 255) {
    return "Email address is too long"
  }

  return null
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }

  if (password.length > 128) {
    return "Password is too long (max 128 characters)"
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter"
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter"
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number"
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character"
  }

  return null
}

// Username validation
export function validateUsername(username: string): string | null {
  if (!username) {
    return "Username is required"
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters long"
  }

  if (username.length > 20) {
    return "Username must be no more than 20 characters long"
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) {
    return "Username must start with a letter and contain only letters, numbers, and underscores"
  }

  // Reserved usernames
  const reservedUsernames = [
    "admin",
    "administrator",
    "root",
    "user",
    "test",
    "guest",
    "api",
    "www",
    "mail",
    "email",
    "support",
    "help",
    "info",
    "contact",
    "about",
    "privacy",
    "terms",
    "login",
    "signup",
    "register",
    "auth",
    "authentication",
    "password",
    "forgot",
    "reset",
    "verify",
    "verification",
  ]

  if (reservedUsernames.includes(username.toLowerCase())) {
    return "This username is reserved. Please choose another one"
  }

  return null
}

// Date of birth validation
export function validateDateOfBirth(dateOfBirth: string): string | null {
  if (!dateOfBirth) {
    return "Date of birth is required"
  }

  const date = new Date(dateOfBirth)
  const today = new Date()

  if (isNaN(date.getTime())) {
    return "Please enter a valid date"
  }

  if (date > today) {
    return "Date of birth cannot be in the future"
  }

  const age = calculateAge(dateOfBirth)
  if (age < 18) {
    return "You must be at least 18 years old to register"
  }

  if (age > 120) {
    return "Please enter a valid date of birth"
  }

  return null
}

// Sex validation
export function validateSex(sex: string): string | null {
  if (!sex) {
    return "Please select your sex"
  }

  const validOptions = ["male", "female", "other", "prefer-not-to-say"]
  if (!validOptions.includes(sex)) {
    return "Please select a valid option"
  }

  return null
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0

  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

// Password strength calculation
export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0
  const feedback: string[] = []

  if (password.length >= 8) score++
  else feedback.push("8+ characters")

  if (/[A-Z]/.test(password)) score++
  else feedback.push("uppercase letter")

  if (/[a-z]/.test(password)) score++
  else feedback.push("lowercase letter")

  if (/\d/.test(password)) score++
  else feedback.push("number")

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
  else feedback.push("special character")

  return { score, feedback }
}

// Validate all fields at once
export function validateAllFields(formData: Partial<SignupFormData>): ValidationErrors {
  const errors: ValidationErrors = {}

  if (formData.email !== undefined) {
    const emailError = validateEmail(formData.email)
    if (emailError) errors.email = emailError
  }

  if (formData.password !== undefined) {
    const passwordError = validatePassword(formData.password)
    if (passwordError) errors.password = passwordError
  }

  if (formData.username !== undefined) {
    const usernameError = validateUsername(formData.username)
    if (usernameError) errors.username = usernameError
  }

  if (formData.dateOfBirth !== undefined) {
    const dobError = validateDateOfBirth(formData.dateOfBirth)
    if (dobError) errors.dateOfBirth = dobError
  }

  if (formData.sex !== undefined) {
    const sexError = validateSex(formData.sex)
    if (sexError) errors.sex = sexError
  }

  return errors
}
