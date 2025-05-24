import { createUser, validateAllFields } from "@/lib/user-actions"
import { NextResponse } from "next/server"

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

export async function POST(request: Request) {
  try {
    const { email, password, dateOfBirth, sex, firstName, lastName } = await request.json()

    if (!email || !password || !dateOfBirth || !sex || !firstName || !lastName) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    const validationErrors = validateAllFields({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      sex,
    })

    if (validationErrors) {
      return NextResponse.json({ success: false, message: validationErrors }, { status: 400 })
    }

    const result = await createUser({
      email,
      password,
      dateOfBirth,
      sex,
      firstName,
      lastName,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: {
        email,
        firstName,
        lastName,
        age: calculateAge(dateOfBirth),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
