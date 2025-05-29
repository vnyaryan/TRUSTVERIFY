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
    name?: boolean
    phone?: boolean
  }
  sharedAt?: Date
  status: "sent" | "failed" | "pending"
}

export interface SharingFormState {
  recipients: {
    [email: string]: {
      shareName: boolean
      sharePhone: boolean
    }
  }
}
