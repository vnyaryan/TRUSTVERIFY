import type { NextRequest } from "next/server"
import { getUserByEmail } from "@/lib/db-operations"
import { verifyPassword } from "@/lib/password-utils"
import { validateEmail } from "@/lib/form-validation"
import { BlobLogger } from "@/lib/blob-logger"

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let email = ""
  let ipAddress = ""
  let userAgent = ""

  try {
    const body = await request.json()
    email = body.email || ""
    const password = body.password || ""

    // Get request metadata
    ipAddress = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    userAgent = request.headers.get("user-agent") || "unknown"

    // Validate required fields
    if (!email || !password) {
      await BlobLogger.logAuthEvent({
        eventType: "login_failure",
        email,
        ipAddress,
        userAgent,
        errorMessage: "Missing email or password",
        additionalData: { missingFields: { email: !email, password: !password } },
      })

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
      await BlobLogger.logAuthEvent({
        eventType: "login_failure",
        email,
        ipAddress,
        userAgent,
        errorMessage: emailError,
      })

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
      await BlobLogger.logAuthEvent({
        eventType: "login_failure",
        email,
        ipAddress,
        userAgent,
        errorMessage: "User not found",
      })

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
      await BlobLogger.logAuthEvent({
        eventType: "login_failure",
        email,
        ipAddress,
        userAgent,
        errorMessage: "Invalid password",
        additionalData: { userId: user.id },
      })

      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // SUCCESS - Log successful login
    await BlobLogger.logAuthEvent({
      eventType: "login_success",
      email,
      ipAddress,
      userAgent,
      additionalData: {
        userId: user.id,
        username: user.username,
        loginDuration: Date.now() - startTime,
      },
    })

    // Create response with user data
    const response = Response.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email_id,
        username: user.username,
        age: user.age,
        sex: user.sex,
      },
    })

    // Set simple session cookie
    const headers = new Headers(response.headers)
    headers.set("Set-Cookie", `session=logged-in; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`)

    return new Response(response.body, {
      status: response.status,
      headers,
    })
  } catch (error) {
    console.error("Login API error:", error)

    // Log the error
    await BlobLogger.logAuthEvent({
      eventType: "login_failure",
      email,
      ipAddress,
      userAgent,
      errorMessage: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      additionalData: { errorStack: error instanceof Error ? error.stack : undefined },
    })

    return Response.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
