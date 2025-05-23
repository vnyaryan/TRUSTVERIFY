import { neon } from "@neondatabase/serverless"

// Use the correct connection string as provided
const sql = neon(
  "postgresql://neondb_owner:npg_DXVMKp6Oxh3Q@ep-bold-water-a55uvkzl-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
)

export { sql }

export async function initializeDatabase() {
  try {
    // Create user_details table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS user_details (
        id SERIAL PRIMARY KEY,
        email_id VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        gender VARCHAR(20) NOT NULL,
        date_of_birth DATE NOT NULL,
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
