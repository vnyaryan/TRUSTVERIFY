export interface SignupFormData {
  email: string
  password: string
  dateOfBirth: string
  sex: string
}

export interface ValidationErrors {
  email?: string
  password?: string
  dateOfBirth?: string
  sex?: string
}

export interface DatabaseUser {
  email_id: string
  password: string
  date_of_birth: string
  created_at: Date
  updated_at: Date
  sex: string
}
