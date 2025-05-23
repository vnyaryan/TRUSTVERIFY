"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sql } from "@/lib/db"
import {
  hashPassword,
  verifyPassword,
  isValidEmail,
  isStrongPassword,
  isValidDateOfBirth,
  isValidUsername,
  sanitizeInput,
} from "@/lib/auth-utils"
import crypto from "crypto"

// Type definitions
type SignupFormData = {
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  username: string
  sex: string
}

type LoginFormData = {
  email: string
  password: string
}

// Error response type
type AuthResponse = {
  success: boolean
  message: string
  fieldErrors?: Record<string, string>
}

// Generate a secure session token
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

// Set session cookie
function setSessionCookie(userId: string, email: string): void {
  const sessionToken = generateSessionToken()
  const twoWeeks = 14 * 24 * 60 * 60 * 1000

  // Store session in cookie
  cookies().set({
    name: "session",
    value: sessionToken,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: twoWeeks,
  })

  // Store session data in database
  sql`
    INSERT INTO user_sessions (
      session_token, 
      user_id, 
      email, 
      expires_at
    ) VALUES (
      ${sessionToken}, 
      ${userId}, 
      ${email}, 
      ${new Date(Date.now() + twoWeeks)}
    )
  `.catch((error) => {
    console.error("Failed to store session:", error)
  })
}

// Signup action
export async function signup(formData: FormData): Promise<AuthResponse> {
  // Extract and sanitize form data
  const email = sanitizeInput(formData.get("email") as string).toLowerCase()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const dateOfBirth = sanitizeInput(formData.get("dateOfBirth") as string)
  const username = sanitizeInput(formData.get("username") as string)
  const sex = sanitizeInput(formData.get("sex") as string)

  // Initialize field errors
  const fieldErrors: Record<string, string> = {}

  // Validate email
  if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address"
  }

  // Validate password
  const passwordCheck = isStrongPassword(password)
  if (!passwordCheck.isValid) {
    fieldErrors.password = passwordCheck.message
  }

  // Confirm passwords match
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match"
  }

  // Validate date of birth
  const dobCheck = isValidDateOfBirth(dateOfBirth)
  if (!dobCheck.isValid) {
    fieldErrors.dateOfBirth = dobCheck.message
  }

  // Validate username
  const usernameCheck = isValidUsername(username)
  if (!usernameCheck.isValid) {
    fieldErrors.username = usernameCheck.message
  }

  // Validate sex
  if (!["male", "female", "other"].includes(sex.toLowerCase())) {
    fieldErrors.sex = "Please select a valid gender"
  }

  // Return validation errors if any
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors in the form",
      fieldErrors,
    }
  }

  try {
    // Check if email already exists
    const existingUser = await sql`
      SELECT email_id FROM user_details WHERE email_id = ${email}
    `

    if (existingUser.length > 0) {
      return {
        success: false,
        message: "An account with this email already exists",
        fieldErrors: { email: "Email already in use" },
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Calculate age from date of birth
    const dobDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - dobDate.getFullYear()
    const monthDiff = today.getMonth() - dobDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--
    }

    // Insert new user
    const result = await sql`
      INSERT INTO user_details (
        email_id, 
        password, 
        date_of_birth, 
        username, 
        age, 
        sex
      ) VALUES (
        ${email}, 
        ${hashedPassword}, 
        ${dateOfBirth}, 
        ${username}, 
        ${age}, 
        ${sex}
      ) RETURNING email_id
    `

    if (result.length > 0) {
      // Set session cookie
      setSessionCookie(result[0].email_id, email)

      return {
        success: true,
        message: "Account created successfully",
      }
    } else {
      return {
        success: false,
        message: "Failed to create account",
      }
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      message: "An error occurred during signup",
    }
  }
}

// Login action
export async function login(formData: FormData): Promise<AuthResponse> {
  // Extract and sanitize form data
  const email = sanitizeInput(formData.get("email") as string).toLowerCase()
  const password = formData.get("password") as string

  // Initialize field errors
  const fieldErrors: Record<string, string> = {}

  // Basic validation
  if (!email) {
    fieldErrors.email = "Email is required"
  }

  if (!password) {
    fieldErrors.password = "Password is required"
  }

  // Return validation errors if any
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors in the form",
      fieldErrors,
    }
  }

  try {
    // Fetch user by email
    const users = await sql`
      SELECT email_id, password FROM user_details WHERE email_id = ${email}
    `

    // Check if user exists
    if (users.length === 0) {
      return {
        success: false,
        message: "Invalid email or password",
        fieldErrors: { email: "Invalid email or password" },
      }
    }

    const user = users[0]

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        fieldErrors: { password: "Invalid email or password" },
      }
    }

    // Set session cookie
    setSessionCookie(user.email_id, email)

    return {
      success: true,
      message: "Login successful",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

// Add the missing exports that reference the existing functions
export const loginUser = login
export const signupUser = signup

// Logout action
export async function logout(): Promise<void> {
  // Get current session token
  const sessionToken = cookies().get("session")?.value

  if (sessionToken) {
    // Delete session from database
    await sql`
      DELETE FROM user_sessions WHERE session_token = ${sessionToken}
    `.catch((error) => {
      console.error("Failed to delete session:", error)
    })

    // Clear session cookie
    cookies().delete("session")
  }

  // Redirect to login page
  redirect("/login")
}

// Check if user is authenticated
export async function getSession(): Promise<{ isLoggedIn: boolean; email?: string }> {
  const sessionToken = cookies().get("session")?.value

  if (!sessionToken) {
    return { isLoggedIn: false }
  }

  try {
    // Find valid session
    const sessions = await sql`
      SELECT user_id, email, expires_at 
      FROM user_sessions 
      WHERE session_token = ${sessionToken}
    `

    if (sessions.length === 0) {
      return { isLoggedIn: false }
    }

    const session = sessions[0]

    // Check if session is expired
    if (new Date(session.expires_at) < new Date()) {
      // Delete expired session
      await sql`
        DELETE FROM user_sessions WHERE session_token = ${sessionToken}
      `

      cookies().delete("session")
      return { isLoggedIn: false }
    }

    return {
      isLoggedIn: true,
      email: session.email,
    }
  } catch (error) {
    console.error("Session verification error:", error)
    return { isLoggedIn: false }
  }
}
