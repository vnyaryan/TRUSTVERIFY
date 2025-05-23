import { neon } from "@neondatabase/serverless"

// Initialize the SQL client with the database URL
const sql = neon(
  "postgresql://neondb_owner:npg_DXVMKp6Oxh3Q@ep-bold-water-a55uvkzl-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
)

// Export the SQL client as named export
export { sql }

// Export getSql function for compatibility with existing code
export function getSql() {
  return sql
}

// Database utility functions
export async function testConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.error("Database connection test failed:", error)
    return false
  }
}

export async function getUserByEmail(email: string) {
  try {
    const users = await sql`
      SELECT 
        email_id,
        password,
        username,
        first_name,
        last_name,
        date_of_birth,
        age,
        sex,
        phone_number,
        created_at
      FROM user_details 
      WHERE email_id = ${email}
    `
    return users.length > 0 ? users[0] : null
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export async function createUser(userData: {
  email: string
  password: string
  username: string
  dateOfBirth: string
  age: number
  sex: string
}) {
  try {
    const result = await sql`
      INSERT INTO user_details (
        email_id,
        password,
        username,
        date_of_birth,
        age,
        sex
      ) VALUES (
        ${userData.email},
        ${userData.password},
        ${userData.username},
        ${userData.dateOfBirth},
        ${userData.age},
        ${userData.sex}
      ) RETURNING email_id
    `
    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

// Add back the initializeDatabase function for compatibility
export async function initializeDatabase() {
  try {
    // Create user_details table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS user_details (
        id SERIAL PRIMARY KEY,
        email_id VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(100),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        phone_number VARCHAR(20),
        sex VARCHAR(20),
        date_of_birth DATE,
        age INTEGER,
        profile_image_url TEXT,
        bio TEXT,
        location VARCHAR(255),
        occupation VARCHAR(255),
        education VARCHAR(255),
        trust_score INTEGER DEFAULT 0,
        verification_status VARCHAR(50) DEFAULT 'pending',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_details_email ON user_details(email_id)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_user_details_created_at ON user_details(created_at)
    `

    console.log("Database initialized successfully")
    return { success: true }
  } catch (error) {
    console.error("Database initialization error:", error)
    return { success: false, error: String(error) }
  }
}

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM user_details WHERE email_id = ${email}
    `

    return Number.parseInt(result[0].count) > 0
  } catch (error) {
    console.error("Error checking if user exists:", error)
    return false
  }
}

export async function testDatabaseConnection() {
  try {
    await sql`SELECT 1 as test`
    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return { success: false, message: "Database connection failed", error: String(error) }
  }
}
