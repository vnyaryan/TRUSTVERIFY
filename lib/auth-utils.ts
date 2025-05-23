import bcryptjs from "bcryptjs"

// Password hashing with bcryptjs (salt rounds of 12)
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcryptjs.hash(password, saltRounds)
}

// Password verification
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcryptjs.compare(password, hashedPassword)
}

// Email validation regex
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password strength validation
export function isStrongPassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" }
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" }
  }

  return { isValid: true, message: "Password is strong" }
}

// Date of birth validation
export function isValidDateOfBirth(dob: string): { isValid: boolean; message: string } {
  const dobDate = new Date(dob)
  const today = new Date()

  // Check if it's a valid date
  if (isNaN(dobDate.getTime())) {
    return { isValid: false, message: "Invalid date format" }
  }

  // Calculate age
  const age = today.getFullYear() - dobDate.getFullYear()
  const monthDiff = today.getMonth() - dobDate.getMonth()

  // Adjust age if birthday hasn't occurred yet this year
  const adjustedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate()) ? age - 1 : age

  // Check if age is at least 18
  if (adjustedAge < 18) {
    return { isValid: false, message: "You must be at least 18 years old" }
  }

  // Check if date is not in the future
  if (dobDate > today) {
    return { isValid: false, message: "Date of birth cannot be in the future" }
  }

  return { isValid: true, message: "Valid date of birth", age: adjustedAge }
}

// Username validation
export function isValidUsername(username: string): { isValid: boolean; message: string } {
  if (username.length < 3 || username.length > 20) {
    return { isValid: false, message: "Username must be between 3 and 20 characters" }
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, message: "Username can only contain letters, numbers, and underscores" }
  }

  return { isValid: true, message: "Valid username" }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  // Trim whitespace
  return input.trim()
}
