import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/db-operations"
import { verifyPassword } from "@/lib/password-utils"
import { logAuthEvent } from "@/lib/blob-logger"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      await logAuthEvent("login_failed", email, "Missing credentials")
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Get user from database
    const user = await getUserByEmail(email)

    if (!user) {
      await logAuthEvent("login_failed", email, "User not found")
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      await logAuthEvent("login_failed", email, "Invalid password")
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth: string) => {
      if (!dateOfBirth) return null

      const today = new Date()
      const birthDate = new Date(dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    }

    // Prepare complete user data for frontend
    const userData = {
      email: user.email_id,
      dateOfBirth: user.date_of_birth,
      sex: user.sex,
      age: calculateAge(user.date_of_birth),
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }

    await logAuthEvent("login_success", email, "User logged in successfully")

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData,
    })
  } catch (error) {
    console.error("Login error:", error)
    await logAuthEvent("login_error", "", `Login error: ${error.message}`)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
