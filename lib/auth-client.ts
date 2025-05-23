// Client-side authentication utilities

export interface AuthResponse {
  success: boolean
  message: string
  fieldErrors?: Record<string, string>
}

export async function loginClient(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

export async function signupClient(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        dateOfBirth: formData.get("dateOfBirth"),
        username: formData.get("username"),
        sex: formData.get("sex"),
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      message: "An error occurred during signup",
    }
  }
}

export async function logoutClient(): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Logout error:", error)
    return {
      success: false,
      message: "An error occurred during logout",
    }
  }
}

export async function getSessionClient(): Promise<{ isLoggedIn: boolean; email?: string }> {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Session check error:", error)
    return { isLoggedIn: false }
  }
}
