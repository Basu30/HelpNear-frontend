// Full user from database -- has everything including server-generated fields
export type User = {
    id: string
    full_name: string
    email: string
    password_hash: string
    phone: string | null
    role: 'customer' | 'provider' | 'admin'
    is_active: boolean
    is_email_verified: boolean
    created_at: Date
    updated_at: Date
}

// What frontend sends when registering - no id, no hash, no timestamps
export type CreateUserDTO = {
    full_name: string
    email: string
    password: string
    phone?: string
    role: 'customer' | 'provider'
}

// What you need send BACK to frontend - never expose password_hash
export type UserResponse = Omit<User, 'password_hash'>