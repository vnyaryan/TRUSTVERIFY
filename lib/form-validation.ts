// Validation utility functions for signup form

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    return "Email is required"
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  if (email.length > 254) {
    return "Email address is too long"
  }

  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter"
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter"
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number"
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character"
  }

  return null
}

export function getPasswordStrength(password: string): { score: number; feedback: string[] } {
  let score = 0
  const feedback: string[] = []

  if (password.length >= 8) score += 1
  else feedback.push("At least 8 characters")

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push("One uppercase letter")

  if (/[a-z]/.test(password)) score += 1
  else feedback.push("One lowercase letter")

  if (/\d/.test(password)) score += 1
  else feedback.push("One number")

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  else feedback.push("One special character")

  return { score, feedback }
}

export function validateUsername(username: string): string | null {
  if (!username) {
    return "Username is required"
  }

  if (username.length < 3 || username.length > 20) {
    return "Username must be between 3 and 20 characters"
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) {
    return "Username must start with a letter and contain only letters, numbers, and underscores"
  }

  // Check for reserved usernames
  const reservedUsernames = ["admin", "root", "user", "test", "guest", "null", "undefined"]
  if (reservedUsernames.includes(username.toLowerCase())) {
    return "This username is reserved. Please choose another one"
  }

  return null
}

export function calculateAge(dateOfBirth: string): number {
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

export function validateAge(age: number): string | null {
  if (age < 18) {
    return "You must be at least 18 years old to register"
  }

  if (age > 120) {
    return "Please enter a valid date of birth"
  }

  return null
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
  if (!dateOfBirth) {
    return "Date of birth is required"
  }

  const birthDate = new Date(dateOfBirth)
  const today = new Date()

  if (birthDate > today) {
    return "Date of birth cannot be in the future"
  }

  const age = calculateAge(dateOfBirth)
  return validateAge(age)
}

export function validateSex(sex: string): string | null {
  if (!sex) {
    return "Please select your sex"
  }

  const validOptions = ["male", "female", "other", "prefer-not-to-say"]
  if (!validOptions.includes(sex)) {
    return "Please select a valid option"
  }

  return null
}

export function validateAllFields(formData: {
  email: string
  password: string
  dateOfBirth: string
  sex: string
  username: string
}): { [key: string]: string } {
  const errors: { [key: string]: string } = {}

  const emailError = validateEmail(formData.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(formData.password)
  if (passwordError) errors.password = passwordError

  const dobError = validateDateOfBirth(formData.dateOfBirth)
  if (dobError) errors.dateOfBirth = dobError

  const sexError = validateSex(formData.sex)
  if (sexError) errors.sex = sexError

  const usernameError = validateUsername(formData.username)
  if (usernameError) errors.username = usernameError

  return errors
}
