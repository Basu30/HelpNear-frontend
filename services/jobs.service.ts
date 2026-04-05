import type { JobRequest } from "@/types/job"
import type { JobStatus } from "@/constant/mainStatus"

// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

export type CreateJobResponse = {
   message: string
    job: JobRequest
}

export type GetJobsResponse = {
    jobs: JobRequest[]
    count: number | null
}

export type GetJobResponse = {
    job: JobRequest
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


// -------------- INPUT TYPE ---------------------------------
  /**
   * What: what frontend sends when creating a job
   * Why: matches CreateJobRequestDTO on backend
   */
type CreateJobInput = {
    category_id: string
    title: string
    description: string
    city: string
    district?: string
    address?: string
    budget_min?: number
    budget_max?: number
    preferred_date?: string
    preferred_time?: string

}

// ------ CREATE JOB ---------------------------------------

export default async function createJob( data: CreateJobInput, token: string ): Promise<CreateJobResponse> {

    const response = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),

        credentials: 'include'
    })

    return handleResponse<CreateJobResponse>(response)
}

// --------------- GET ALL OPEN JOBS ------------------------

export async function getAllJobs(token: string, page: 1, limit: 10): Promise<GetJobsResponse> {

    const res = await fetch(`${BASE_URL}/jobs?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        
        credentials: 'include',
    })

    return handleResponse<GetJobsResponse>(res)
}

// --------- GET CUSTOMER'S OWN JOBS --------------------------

export async function getCustomerJobs(token: string): Promise<GetJobsResponse> {

    const res = await fetch(`${BASE_URL}/customer/jobs`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },
        credentials: 'include',
    })

    return handleResponse<GetJobsResponse>(res)
}

// ------------- GET JOB BY ID -------------------------------

export async function getJobById(jobId: string, token: string): Promise<GetJobResponse> {

    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        },

        credentials: 'include'
    })

    return handleResponse<GetJobResponse>(res)
}