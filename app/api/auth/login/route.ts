import type { NextRequest } from "next/server"
import { getUserByEmail } from "@/lib/db-operations"
import { verifyPassword } from "@/lib/password-utils"
import { validateEmail } from "@/lib/form-validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailError = validateEmail(email)
    if (emailError) {
      return Response.json(
        {
          success: false,
          message: emailError,
        },
        { status: 400 },
      )
    }

    // Get user from database
    const user = await getUserByEmail(email.toLowerCase())
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Success response
    return Response.json({
      success: true,
      message: "Login successful",
      data: {
        email: user.email_id,
        username: user.username,
        age: user.age,
        sex: user.sex,
      },
      router: "App Router",
    })
  } catch (error) {
    console.error("Login API error:", error)
    return Response.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return Response.json(
    {
      success: false,
      message: "Method not allowed. Use POST to login.",
      allowedMethods: ["POST"],
    },
    { status: 405 },
  )
}
