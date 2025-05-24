"use client"

export interface User {
  email: string
  username: string
  age: number
  sex: string
}

// Check if user is logged in by calling session API
export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      credentials: "include", // Include cookies
    })

    const data = await response.json()
    return data.success && data.isAuthenticated
  } catch (error) {
    console.error("Auth check failed:", error)
    return false
  }
}

// Get current user data from session API
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      credentials: "include", // Include cookies
    })

    const data = await response.json()

    if (data.success && data.user) {
      return data.user as User
    }

    return null
  } catch (error) {
    console.error("Get user failed:", error)
    return null
  }
}

// Logout user using API
export async function logout(): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (data.success) {
      // Redirect to home page after successful logout
      window.location.href = "/"
      return true
    } else {
      console.error("Logout failed:", data.message)
      return false
    }
  } catch (error) {
    console.error("Logout error:", error)
    return false
  }
}

// Login function (for form submission)
export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include", // Include cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login failed" }
  }
}
