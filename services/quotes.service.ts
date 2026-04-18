import type { Quote } from "@/types/quote";



// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

export type GetQuotesResponse = {
    message: string
    quotes: Quote[]
    count: number | null

}

export type QuoteWithProvider = Quote & {
    provider_name: string
    provider_city: string
    provider_district: string
    provider_reviews: number
    average_rating: number
    is_verified: boolean
    completed_jobs: number
}

export type GetJobQuotesResponse = {
    quotes: QuoteWithProvider[]
    count: number | null
}

type WithDrawResponse = {
    message: string
    quote: Quote
}

type AcceptQuoteResponse = {
    message: string
    booking: {
        id: string
        job_request_id: string
        customer_id: string
        provider_id: string
        accepted_quote_id: string
        status: string
        created_at: string
    }
}
// ------------- HANDLE RESPONSE HELPER --------------------------------

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

// -------------- SUBMIT QUOTE ------------------------------------

type SubmitQuoteInput = {
    price: number
    message?: string
    estimated_time?: string
}

export async function submitQuote (data: SubmitQuoteInput, jobId: string, token: string): Promise<{ message: string, quote: string}> {

    const response = await fetch(`${BASE_URL}/jobs/${jobId}/quotes`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }, 
        body: JSON.stringify( data ),

        credentials: 'include'
    })

    return handleResponse<{message: string, quote: string}>(response)
}

// ------------------- GET JOB QUOTES -------------------------------------

export async function getJobQuotes (jobId: string, token: string): Promise<GetJobQuotesResponse> {

    const res = await fetch(`${BASE_URL}/jobs/${jobId}/quotes`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetJobQuotesResponse>(res)
}

// ----------------------- GET PROVIDER QUOTES -------------------------------------

export async function getProviderQuotes (token: string): Promise<GetQuotesResponse> {

    const res = await fetch(`${BASE_URL}/provider/quotes`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetQuotesResponse>(res)
}

// ------------------ WITHDRAW QUOTE -------------------------------

export async function withDrawQuote (quoteId: string, token: string): Promise<WithDrawResponse> {

    const res = await fetch(`${BASE_URL}/quotes/${quoteId}/withdraw`, {
        method: 'PATCH',
        headers: {
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<WithDrawResponse>(res)
}

// ------------------ ACCEPT QUOTE (customer) ----------------------

export async function acceptQuote (quoteId: string, token: string): Promise<AcceptQuoteResponse> {

    const res = await fetch(`${BASE_URL}/quotes/${quoteId}/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<AcceptQuoteResponse>(res)
}