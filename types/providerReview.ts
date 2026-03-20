export type ProviderReview = {
    id: string
    booking_id: string
    customer_id: string
    provider_id: string
    rating: number
    comment: string | null
    created_at: Date
}

export type CreateProviderReviewDTO = {
    rating: number    // required - 1 to 5
    comment?: string
}