export interface SignupFormData {
  email: string
  password: string
  dateOfBirth: string
  sex: string
  age: number
  username: string
}

export interface ValidationErrors {
  email?: string
  password?: string
  dateOfBirth?: string
  sex?: string
  age?: string
  username?: string
}

export type SexOption = "male" | "female" | "other" | "prefer-not-to-say"

export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
}

export interface PasswordStrength {
  score: number
  feedback: string[]
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
  errors?: ValidationErrors
}

export interface DatabaseUser {
  email_id: string
  password: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  sex: string
  age: number
  username: string
}
