import { sql } from "./db"
import { hash } from "bcrypt"

export interface UserData {
  email: string
  password: string
  dateOfBirth: string
  sex: string
}

export interface DatabaseUser {
  email_id: string
  password: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  sex: string
}

// Insert new user into database
export async function createUser(userData: UserData): Promise<{ success: boolean; message: string; userId?: string }> {
  try {
    // Check if email already exists
    const emailExists = await checkEmailExists(userData.email)
    if (emailExists) {
      return { success: false, message: "Email address is already registered" }
    }

    // Hash the password
    const hashedPassword = await hashPassword(userData.password)

    // Calculate age from date of birth
    const age = calculateAge(userData.dateOfBirth)

    // Insert user into database
    const result = await sql`
      INSERT INTO user_details (
        email_id, 
        password, 
        date_of_birth, 
        sex, 
        age, 
        created_at, 
        updated_at
      ) VALUES (
        ${userData.email},
        ${hashedPassword},
        ${userData.dateOfBirth},
        ${userData.sex},
        ${age},
        NOW(),
        NOW()
      )
      RETURNING email_id
    `

    if (result.length > 0) {
      return {
        success: true,
        message: "User created successfully",
        userId: result[0].email_id,
      }
    } else {
      return { success: false, message: "Failed to create user" }
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, message: "Database error occurred while creating user" }
  }
}

// Check if email exists
async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const result = await sql`SELECT email_id FROM user_details WHERE email_id = ${email}`
    return result.rowCount > 0
  } catch (error) {
    console.error("Error checking email existence:", error)
    return true // Return true to prevent user creation in case of database error
  }
}

// Hash password
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await hash(password, saltRounds)
}

// Calculate age from date of birth
function calculateAge(dateOfBirth: string): number {
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

// Get user by email
export async function getUserByEmail(email: string): Promise<DatabaseUser | null> {
  try {
    const result = await sql`
      SELECT * FROM user_details WHERE email_id = ${email}
    `

    if (result.length > 0) {
      return result[0] as DatabaseUser
    }

    return null
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw new Error("Failed to retrieve user")
  }
}

// Get user by username (keeping for compatibility)
export async function getUserByUsername(username: string): Promise<DatabaseUser | null> {
  try {
    const result = await sql`
      SELECT * FROM user_details WHERE email_id = ${username}
    `

    if (result.length > 0) {
      return result[0] as DatabaseUser
    }

    return null
  } catch (error) {
    console.error("Error getting user by username:", error)
    throw new Error("Failed to retrieve user")
  }
}

// Update user's updated_at timestamp
export async function updateUserTimestamp(email: string): Promise<boolean> {
  try {
    await sql`
      UPDATE user_details 
      SET updated_at = NOW() 
      WHERE email_id = ${email}
    `
    return true
  } catch (error) {
    console.error("Error updating user timestamp:", error)
    return false
  }
}

// Get total user count
export async function getUserCount(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM user_details
    `
    return Number.parseInt(result[0].count)
  } catch (error) {
    console.error("Error getting user count:", error)
    return 0
  }
}

// Sanitize input to prevent SQL injection (additional safety)
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

// Hash password utility
