// Client-side authentication utilities

export interface AuthResponse {
  success: boolean
  message: string
  fieldErrors?: Record<string, string>
}

export async function loginClient(formData: FormData): Promise<AuthResponse> {
  try {
    // Convert FormData to JSON
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("Submitting login with email:", email)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      console.error("Login failed with status:", response.status)
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signupClient(formData: FormData): Promise<AuthResponse> {
  try {
    // Convert FormData to JSON
    const formValues = Object.fromEntries(formData.entries())

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })

    if (!response.ok) {
      console.error("Signup failed with status:", response.status)
      return {
        success: false,
        message: "An error occurred during signup. Please try again.",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function logoutClient(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    window.location.href = "/"
  } catch (error) {
    console.error("Logout error:", error)
    window.location.href = "/"
  }
}

export async function getSessionClient(): Promise<{ isLoggedIn: boolean; email?: string }> {
  try {
    const response = await fetch("/api/auth/session")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Session check error:", error)
    return { isLoggedIn: false }
  }
}
