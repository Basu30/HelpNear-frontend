
import type { ProviderProfile } from "@/types/providerProfile";
import type { JobRequest } from "@/types/job";



// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

export type GetProfileResponse = {
    profile: ProviderProfile
}

export type UpdateProfileResponse = {
    message: string
    profile: ProviderProfile
}

export type GetJobsResponse = {
    jobs: JobRequest[]
    count: number | null
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


// ------------ GET OWN PROFILE -----------------------------

export async function ownProfile (token: string): Promise<GetProfileResponse> {
    
   
    const result = await fetch(`${BASE_URL}/provider/profile`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetProfileResponse>(result)
}

// --------------- UPDATE PROFILE ----------------------------------
  /**
   * What: update provider's profile details
   * When: called on form submit in p_profile page
   */
type UpdateProfileInput = {
    bio?: string
    experience_years?: number
    city?: string
    district?: string
}
export async function updateProfile(data: UpdateProfileInput, token: string): Promise<UpdateProfileResponse> {
  
        const result = await fetch(`${BASE_URL}/provider/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify( data ),

            credentials: 'include'
        })

    return handleResponse<UpdateProfileResponse>(result)
   
    
}

// ---------------- UPDATE CATEGORIES ----------------------
  /**
   * What: save which categories provider offers
   * When: called when provider selects categories in p_profile page
   */
export async function updateCategories(category_ids: string[], token: string): Promise< { message: string } > {

    const result = await fetch(`${BASE_URL}/provider/categories`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },

        body: JSON.stringify({ category_ids }),

        credentials: 'include',
    })
    
    return handleResponse<{ message: string }>(result)
}

// ------------- GET PROVIDER JOBS ----------------------------

export async function getProviderJobs (token: string): Promise<GetJobsResponse> {
    
    const result = await fetch(`${BASE_URL}/provider/jobs`, {
        method: 'GET', 
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetJobsResponse>(result)
}