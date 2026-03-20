import type { BookingStatus } from "@/constant/mainStatus";

export type Booking = {
    id: string
    job_request_id: string
    customer_id: string
    provider_id: string
    accepted_quote_id: string
    status: BookingStatus
    start_time: Date | null
    completed_at: Date | null
    cancelled_at: Date | null
    cancellation_reason: string | null
    created_at: Date
    updated_at: Date
}

// This is what gets sent when CANCELLING a booking
export type CancelBookingDTO = {
    cancellation_reason?: string
}