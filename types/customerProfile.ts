export type CustomerProfile = {
    id: string
    user_id: string
    profile_image_url: string | null
    city: string | null
    district: string | null
    default_address: string | null
    is_phone_verified: boolean
    is_identity_verified: boolean
    average_rating: number
    total_reviews: number
    total_completed_bookings: number
    total_cancelled_bookings: number
    created_at: Date
    updated_at: Date
}

export type CreateCustomerProfileDTO = {
    profile_image_url?: string
    city?: string
    district?: string
    default_address?: string
}

export type UpdateCustomerProfileDTO = {
    profile_image_url?: string
    city?: string
    district?: string
    default_address?: string
}