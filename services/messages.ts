import type { Message } from "@/types/message";

// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

export type GetMessageResponse = {
    messages: Message[]
    count: number | null
}

export type SendMessageResponse = {
    message: Message
}

export type ApiError = {
    error: string
}

async function handleResponse<T>(res: Response): Promise<T> {

    if (!res.ok) {
        const errorData: ApiError = await res.json()

        throw new Error(errorData.error ?? 'Something went wrong')
    }

    return res.json() as Promise<T>
}

// ------- GET MESSAGES ------------------------------------------
  /**
   * What: laods all past messages for a booking
   * When: called once when chat page opens
   * Why: Socket.IO only handles NEW messages - history comes from REST
   */
export async function getMessages(bookingId: string, token: string): Promise<GetMessageResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/messages`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetMessageResponse>(res)
}

// ------ SEND MESSAGES ----------------------------------------

/**
 * What: sends a message via REST instead of Socket.IO
 * When: used as fallback if socket connection fails
 */

export async function sendMessage(bookingId: string, token: string, message_text: string): Promise<SendMessageResponse> {

    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ message_text }), 

        credentials: 'include'
    })

    return handleResponse<SendMessageResponse>(res)
}