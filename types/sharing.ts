export interface SharingPreference {
  id?: number
  userId: string
  recipientEmail: string
  shareName: boolean
  sharePhone: boolean
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface SharingHistory {
  id?: number
  userId: string
  recipientEmail: string
  sharedData: {
    name?: string
    phone?: string
  }
  sharedAt?: Date
  status: "sent" | "failed" | "pending"
}

export interface SharingFormData {
  recipientEmail: string
  shareName: boolean
  sharePhone: boolean
}

export interface LocalStorageCache {
  preferences: SharingPreference[]
  lastSync: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
