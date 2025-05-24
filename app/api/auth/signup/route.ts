import type { NextRequest } from "next/server"
import { createUser, sanitizeInput } from "@/lib/db-operations"
import { validateAllFields, calculateAge } from "@/lib/form-validation"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { email, password, dateOfBirth, sex, username } = body

    // Validate required fields
    if (!email || !password || !dateOfBirth || !sex || !username) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
          missingFields: {
            email: !email,
            password: !password,
            dateOfBirth: !dateOfBirth,
            sex: !sex,
            username: !username,
          },
        },
        { status: 400 },
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      email: sanitizeInput(email.toLowerCase()),
      password: password, // Don't sanitize password as it might contain special chars
      dateOfBirth: sanitizeInput(dateOfBirth),
      sex: sanitizeInput(sex),
      username: sanitizeInput(username.toLowerCase()),
    }

    // Calculate age from date of birth
    const age = calculateAge(sanitizedData.dateOfBirth)

    // Validate all fields using existing validation functions
    const validationErrors = validateAllFields({
      email: sanitizedData.email,
      password: sanitizedData.password,
      dateOfBirth: sanitizedData.dateOfBirth,
      sex: sanitizedData.sex,
      username: sanitizedData.username,
    })

    // If validation errors exist, return them
    if (Object.keys(validationErrors).length > 0) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 },
      )
    }

    // Prepare user data for database insertion
    const userData = {
      email: sanitizedData.email,
      password: sanitizedData.password,
      dateOfBirth: sanitizedData.dateOfBirth,
      sex: sanitizedData.sex,
      age: age,
      username: sanitizedData.username,
    }

    // Create user in database
    const result = await createUser(userData)

    if (result.success) {
      // Success response
      return Response.json(
        {
          success: true,
          message: result.message,
          data: {
            email: userData.email,
            username: userData.username,
            age: userData.age,
            sex: userData.sex,
            dateOfBirth: userData.dateOfBirth,
            userId: result.userId,
          },
          router: "App Router",
        },
        { status: 201 },
      )
    } else {
      // Database error or duplicate user
      return Response.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Signup API error:", error)

    // Return generic error message to client
    return Response.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return Response.json(
    {
      success: false,
      message: "Method not allowed. Use POST to create an account.",
      allowedMethods: ["POST"],
    },
    { status: 405 },
  )
}
