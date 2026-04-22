import type { Booking } from "@/types/booking"

// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

export type GetBookingsResponse = {
    bookings: Booking[]
    count: number | null
}

export type GetBookingResponse = {
    booking: Booking
}

export type BookingActionResponse = {
    message: string
    booking: {
        id: string
        status: string
        updated_at: string
    }
}


type ApiError = {
    error: string
}

async function handleResponse<T>(res: Response): Promise<T> {

    if (!res.ok) {
        const errorData: ApiError = await res.json()

        throw new Error(errorData.error ?? 'Something went wrong')
    }

    return res.json() as Promise<T>
}

export async function getCustomerBookings (token: string): Promise<GetBookingsResponse> {

    const res = await fetch(`${BASE_URL}/customer/bookings`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include'
    })

    return handleResponse<GetBookingsResponse>(res)
}

export async function getProviderBookings (token: string): Promise<GetBookingsResponse> {

     const res = await fetch(`${BASE_URL}/provider/bookings`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include'
    })

    return handleResponse<GetBookingsResponse>(res)
}


export async function getBookingById (bookingId: string, token: string): Promise<GetBookingResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include'
    })

    return handleResponse<GetBookingResponse>(res)
}

export async function startBooking (bookingId: string, token: string): Promise<BookingActionResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/start`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include'
    })

    return handleResponse<BookingActionResponse>(res)
}

export async function completeBooking (bookingId: string, token: string): Promise<BookingActionResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/complete`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include'
    })

    return handleResponse<BookingActionResponse>(res)
}

type cancelBookingInput = {
    cancellation_reason?: string
}

export async function cancelBooking (bookingId: string, data: cancelBookingInput, token: string): Promise<BookingActionResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify( data ),

        credentials: 'include'
    })

    return handleResponse<BookingActionResponse>(res)
}