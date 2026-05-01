import type { CustomerProfile } from "@/types/customerProfile";



// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'


export type GetProfileResponse = {
    customers: CustomerProfile
    count: number | null
}

export type UpdateProfileResponse = {
    message: string
    customer: CustomerProfile
}

type ApiError = {
    error: string
}
// ----------------------------- HELPER ----------------------------------------------------
  /* 
    What: checks if response is ok, parses JSON, throws on error
    Why: every fetch call needs the same error checking logic this helper does it once -- used by all functions below
  */
async function handleResponse<T>(res: Response): Promise<T> {
  /* What: res.ok is true for status 200-299, false for 400+ errors
     Why:  fetch does NOT throw on 4xx/5xx — must check manually
  */
    if (!res.ok) {
        /*
          What: parse the error body the backend sends
         */
        const errorData: ApiError = await res.json()
        /*
          What: throw an Error with the backend message
          Why: the component's catch block receives this message and can show it to the user
        */
        throw new Error(errorData.error ?? 'Something went wrong')
    }

    /*
      What: parse and return the successful response as type T
      Why: T is a generic - caller decides what type comes back 
            loginUser<LoginResponse> -> returns LoginResponse
            registerResponse<RegisterResponse> -> returns RegisterResponse
    */

    return res.json() as Promise<T>
}


export async function getAllCustomers (token: string): Promise<GetProfileResponse> {
    
    const res = await fetch(`${BASE_URL}/customers`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetProfileResponse>(res)
}

type CustomerProfileInput = {
    city?: string
    district?: string
    default_address?: string
}
export async function updateProfile (token: string, data: CustomerProfileInput): Promise<UpdateProfileResponse> {

    const res = await fetch(`${BASE_URL}/customer/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify( data ),

        credentials: 'include'
    })

    return handleResponse<UpdateProfileResponse>(res)
}