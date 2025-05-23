// Type definitions
export type AuthResponse = {
  success: boolean
  message: string
  fieldErrors?: Record<string, string>
}

// Client-side login function
export async function loginClient(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      return {
        success: false,
        message: "An error occurred during login",
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

// Client-side signup function
export async function signupClient(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      return {
        success: false,
        message: "An error occurred during signup",
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

// Client-side logout function
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
