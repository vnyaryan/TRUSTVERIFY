"use client"

export interface User {
  email: string
  username: string
  age: number
  sex: string
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

// Simple client-side auth check
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isLoggedIn") === "true"
}

// Get user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  if (!userData) return null

  try {
    return JSON.parse(userData) as User
  } catch {
    return null
  }
}

// Simple logout function
export async function logout(): Promise<void> {
  try {
    // Call logout API
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
  } catch (error) {
    console.error("Logout API error:", error)
  }

  // Clear localStorage regardless
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/"
  }
}
