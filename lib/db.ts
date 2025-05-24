import { neon } from "@neondatabase/serverless"

// Direct connection string as requested - no environment variables
const sql = neon(
  "postgresql://neondb_owner:npg_DXVMKp6Oxh3Q@ep-bold-water-a55uvkzl-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
)

export { sql }

// Export function for compatibility
export function getSql() {
  return sql
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    const result = await sql`SELECT 1 as test`
    console.log("Database connection successful:", result)
    return { success: true, message: "Database connected successfully" }
  } catch (error) {
    console.error("Database connection failed:", error)
    return { success: false, message: "Database connection failed", error }
  }
}

// Check if user_details table exists and get its structure
export async function checkUserDetailsTable() {
  try {
    const result = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'user_details' 
      ORDER BY ordinal_position
    `
    console.log("user_details table structure:", result)
    return { success: true, columns: result }
  } catch (error) {
    console.error("Error checking user_details table:", error)
    return { success: false, error }
  }
}

// Get user count from user_details table
export async function getUserCount() {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM user_details
    `
    const count = Number.parseInt(result[0].count)
    console.log("User count:", count)
    return { success: true, count }
  } catch (error) {
    console.error("Error getting user count:", error)
    return { success: false, error, count: 0 }
  }
}

// Check if email exists in database
export async function checkEmailExists(email: string) {
  try {
    const result = await sql`
      SELECT email_id FROM user_details WHERE email_id = ${email.toLowerCase()}
    `
    return result.length > 0
  } catch (error) {
    console.error("Error checking email:", error)
    return false
  }
}

// Check if username exists in database
export async function checkUsernameExists(username: string) {
  try {
    const result = await sql`
      SELECT username FROM user_details WHERE username = ${username.toLowerCase()}
    `
    return result.length > 0
  } catch (error) {
    console.error("Error checking username:", error)
    return false
  }
}

// Initialize database (create table if not exists)
export async function initializeDatabase() {
  try {
    // Check if user_details table exists, if not create it
    await sql`
      CREATE TABLE IF NOT EXISTS user_details (
        id SERIAL PRIMARY KEY,
        email_id VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        sex TEXT NOT NULL,
        age NUMERIC NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_details_email ON user_details(email_id)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_details_username ON user_details(username)
    `

    console.log("Database initialized successfully")
    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Database initialization error:", error)
    return { success: false, error: String(error) }
  }
}
