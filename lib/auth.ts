import crypto from "crypto"

/**
 * Hash a password using PBKDF2 with a random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return `${salt}:${hash}`
}

/**
 * Verify a password against a stored hash
 */
export function verifyPassword(storedPassword: string, suppliedPassword: string): boolean {
  try {
    const [salt, hash] = storedPassword.split(":")
    if (!salt || !hash) {
      return false
    }

    const suppliedHash = crypto.pbkdf2Sync(suppliedPassword, salt, 1000, 64, "sha512").toString("hex")
    return hash === suppliedHash
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" }
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" }
  }

  return { isValid: true }
}
