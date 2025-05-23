import { NextResponse } from "next/server"
import { getSession, getUserDetails } from "@/lib/session"

export async function GET() {
  try {
    // Get the current session
    const session = getSession()

    if (!session || !session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user details from the database
    const userDetails = await getUserDetails(session.email)

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user details (excluding sensitive information)
    return NextResponse.json({
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      phoneNumber: userDetails.phoneNumber,
      gender: userDetails.gender,
      dateOfBirth: userDetails.dateOfBirth,
      createdAt: userDetails.createdAt,
    })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Get the current session
    const session = getSession()

    if (!session || !session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, phoneNumber, bio, location, occupation, education } = body

    // Update user profile in database
    const { getSql } = await import("@/lib/db")
    const sql = getSql()

    await sql`
      UPDATE user_details 
      SET 
        first_name = ${firstName},
        last_name = ${lastName},
        phone_number = ${phoneNumber},
        bio = ${bio || null},
        location = ${location || null},
        occupation = ${occupation || null},
        education = ${education || null},
        updated_at = NOW()
      WHERE email_id = ${session.email}
    `

    return NextResponse.json({ success: true, message: "Profile updated successfully" })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
