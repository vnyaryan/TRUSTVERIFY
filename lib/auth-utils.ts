import bcrypt from "bcryptjs"

/**
 * Validate email format using regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check if password meets strength requirements
 */
export function isStrongPassword(password: string): { isValid: boolean; message: string } {
  if (!password) {
    return { isValid: false, message: "Password is required" }
  }

  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" }
  }

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUppercase) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!hasLowercase) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!hasNumber) {
    return { isValid: false, message: "Password must contain at least one number" }
  }

  if (!hasSpecialChar) {
    return { isValid: false, message: "Password must contain at least one special character" }
  }

  return { isValid: true, message: "Password is strong" }
}

/**
 * Validate date of birth
 */
export function isValidDateOfBirth(dob: string): { isValid: boolean; message: string } {
  if (!dob) {
    return { isValid: false, message: "Date of birth is required" }
  }

  const dobDate = new Date(dob)
  const today = new Date()

  // Check if date is valid
  if (isNaN(dobDate.getTime())) {
    return { isValid: false, message: "Please enter a valid date" }
  }

  // Check if date is not in the future
  if (dobDate > today) {
    return { isValid: false, message: "Date of birth cannot be in the future" }
  }

  // Calculate age
  let age = today.getFullYear() - dobDate.getFullYear()
  const monthDiff = today.getMonth() - dobDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--
  }

  // Check minimum age requirement
  if (age < 18) {
    return { isValid: false, message: "You must be at least 18 years old to register" }
  }

  // Check maximum reasonable age
  if (age > 120) {
    return { isValid: false, message: "Please enter a valid date of birth" }
  }

  return { isValid: true, message: "Date of birth is valid" }
}

/**
 * Validate username format and length
 */
export function isValidUsername(username: string): { isValid: boolean; message: string } {
  if (!username) {
    return { isValid: false, message: "Username is required" }
  }

  if (username.length < 3) {
    return { isValid: false, message: "Username must be at least 3 characters long" }
  }

  if (username.length > 20) {
    return { isValid: false, message: "Username must be no more than 20 characters long" }
  }

  // Allow letters, numbers, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      message: "Username can only contain letters, numbers, underscores, and hyphens",
    }
  }

  // Check for reserved usernames
  const reservedUsernames = ["admin", "administrator", "root", "user", "test", "guest", "api", "www", "mail", "support"]
  if (reservedUsernames.includes(username.toLowerCase())) {
    return { isValid: false, message: "This username is reserved and cannot be used" }
  }

  return { isValid: true, message: "Username is valid" }
}

/**
 * Sanitize user input by trimming whitespace
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return ""
  return input.trim()
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

/**
 * Generate a random string for tokens
 */
export function generateRandomString(length = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhoneNumber(phone: string): { isValid: boolean; message: string } {
  if (!phone) {
    return { isValid: false, message: "Phone number is required" }
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, "")

  if (digitsOnly.length < 10) {
    return { isValid: false, message: "Phone number must be at least 10 digits" }
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, message: "Phone number must be no more than 15 digits" }
  }

  return { isValid: true, message: "Phone number is valid" }
}

// Aliases for backward compatibility
export const validateEmail = isValidEmail
export const validatePassword = (password: string) => isStrongPassword(password).isValid
export const validateDateOfBirth = (dob: string) => isValidDateOfBirth(dob).isValid
export const validateUsername = (username: string) => isValidUsername(username).isValid
