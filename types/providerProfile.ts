export type ProviderProfile = {
    id: string
    user_id: string
    bio: string | null
    experience_years: number
    city: string | null
    district: string | null
    is_phone_verified: boolean
    is_identity_verified: boolean
    is_verified: boolean
    average_rating: number
    total_reviews: number
    completed_jobs_count: number
    created_at: Date
    updated_at: Date
}

export type CreateProviderProfileDTO = {
    bio?: string
    experience_years?: number
    city?: string
    district?: string 
}