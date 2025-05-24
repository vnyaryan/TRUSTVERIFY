// lib/form-validation.ts

export interface SignupFormData {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  sex?: string
}

export interface ValidationErrors {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  sex?: string
}

// Email validation
export function validateEmail(email: string): string | null {
  if (!email) {
    return "Email is required"
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format"
  }

  return null
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }

  return null
}

// First name validation
export function validateFirstName(firstName: string): string | null {
  if (!firstName) {
    return "First name is required"
  }

  const trimmedName = firstName.trim()

  if (trimmedName.length < 2) {
    return "First name must be at least 2 characters long"
  }

  if (trimmedName.length > 50) {
    return "First name must be no more than 50 characters long"
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
    return "First name can only contain letters, spaces, hyphens, and apostrophes"
  }

  return null
}

// Last name validation
export function validateLastName(lastName: string): string | null {
  if (!lastName) {
    return "Last name is required"
  }

  const trimmedName = lastName.trim()

  if (trimmedName.length < 2) {
    return "Last name must be at least 2 characters long"
  }

  if (trimmedName.length > 50) {
    return "Last name must be no more than 50 characters long"
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
    return "Last name can only contain letters, spaces, hyphens, and apostrophes"
  }

  return null
}

// Date of birth validation
export function validateDateOfBirth(dateOfBirth: string): string | null {
  if (!dateOfBirth) {
    return "Date of birth is required"
  }

  const dob = new Date(dateOfBirth)
  const now = new Date()

  if (dob > now) {
    return "Date of birth cannot be in the future"
  }

  return null
}

// Sex validation
export function validateSex(sex: string): string | null {
  if (!sex) {
    return "Sex is required"
  }

  if (!["male", "female", "other"].includes(sex.toLowerCase())) {
    return "Invalid sex value"
  }

  return null
}

export function validateAllFields(formData: Partial<SignupFormData>): ValidationErrors {
  const errors: ValidationErrors = {}

  if (formData.email !== undefined) {
    const emailError = validateEmail(formData.email)
    if (emailError) errors.email = emailError
  }

  if (formData.password !== undefined) {
    const passwordError = validatePassword(formData.password)
    if (passwordError) errors.password = passwordError
  }

  if (formData.firstName !== undefined) {
    const firstNameError = validateFirstName(formData.firstName)
    if (firstNameError) errors.firstName = firstNameError
  }

  if (formData.lastName !== undefined) {
    const lastNameError = validateLastName(formData.lastName)
    if (lastNameError) errors.lastName = lastNameError
  }

  if (formData.dateOfBirth !== undefined) {
    const dobError = validateDateOfBirth(formData.dateOfBirth)
    if (dobError) errors.dateOfBirth = dobError
  }

  if (formData.sex !== undefined) {
    const sexError = validateSex(formData.sex)
    if (sexError) errors.sex = sexError
  }

  return errors
}
