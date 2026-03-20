import type { JobStatus } from "@/constant/mainStatus"

export type JobRequest = {
    id: string
    customer_id: string
    category_id: string
    title: string
    description: string
    budget_min: number | null
    budget_max: number | null
    city: string
    district: string | null
    address: string | null
    preferred_date: Date | null
    preferred_time: string | null
    status: JobStatus
    selected_quote_id: string | null
    created_at: Date
    updated_at: Date
}

export type CreateJobDTO = {
    category_id: string
    title: string
    description: string
    budget_min?: number
    budget_max?: number
    city: string
    district?: string 
    address?: string
    preferred_date: string
    preferred_time: string | null
}