import bcryptjs from "bcryptjs"

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword)
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""
  return input.trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
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

  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    return {
      isValid: false,
      message: "Password must include uppercase, lowercase, number, and special character",
    }
  }

  return { isValid: true, message: "" }
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
    return { isValid: false, message: "Invalid date format" }
  }

  // Calculate age
  let age = today.getFullYear() - dobDate.getFullYear()
  const monthDiff = today.getMonth() - dobDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--
  }

  // Check if user is at least 18 years old
  if (age < 18) {
    return { isValid: false, message: "You must be at least 18 years old" }
  }

  return { isValid: true, message: "" }
}

/**
 * Validate username
 */
export function isValidUsername(username: string): { isValid: boolean; message: string } {
  if (!username) {
    return { isValid: false, message: "Username is required" }
  }

  if (username.length < 3 || username.length > 20) {
    return { isValid: false, message: "Username must be between 3 and 20 characters" }
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: "Username can only contain letters, numbers, and underscores" }
  }

  return { isValid: true, message: "" }
}
