import type { QuoteStatus } from "@/constant/mainStatus"


export type Quote = {
    id: string
    job_request_id: string
    provider_id: string
    price: number
    message: string | null
    estimated_time: string | null
    status: QuoteStatus
    created_at: Date
    updated_at: Date

    title: string
    description?: string
    budget_min?: number
    budget_max?: number
    city?: string
    district?: string
    job_status?: string
    customer_name: string
}

export type CreateQuoteDTO = {
    price: number
    message?: string
    estimated_time?: string
} 