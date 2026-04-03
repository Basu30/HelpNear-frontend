
// What: all API calls related to authentication
// Why: one place for all auth fetch logic -- componentes stay clean
// When: imported and called from login/register components


// BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'

// RESPONSE TYPES
export type AuthUser = {
    id: string
    full_name: string
    email: string
    role: 'customer' | 'provider' | 'admin'
}


export type LoginResponse = {
    accessToken: string
    user: {
        id: string
        full_name: string
        email: string
        role: 'customer' | 'provider' | 'admin'
    }
}

export type RegisterResponse = {
    message: string
    user: AuthUser
}

// What: shape of errors from backend
// Why: the backend sends { error: 'message' } on failure
//      this type lets me handle errors cleanly

type ApiError = {
    error: string
}

// ----------------------------- HELPER --------------------------------------------------------
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

// ---------------------------- LOGIN -------------------------------------------------------
  
  /*
    What: sends email + password to backend, gets tokens back
    When: called when user clicks "Log in" button
    Returns: LoginResponse ( accessToken, user ) 
  */

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            /*
              What: tells backend the body is JSON
              Why: without this, Express can't parse req.body
            */
            'Content-Type' : 'application/json'
        },

        /*
          What: converts JS object to JSON string for the request body
          Why: fetch body must be a string, not an object
        */
        body: JSON.stringify({ email, password }),

        /*
          What: tells browser to send cookies with this request
          Why: refresh token lives in httpOnly cookie
               without this, browser blocks the cookie
        */
        credentials: 'include',
    })

    /*
      What: handleResponse checks status, parses JSON, throws on error
      <LoginResponse> tells TypeScript what shape to expect back
    */
    return handleResponse<LoginResponse>(res)
}

// ------------------------ REGISTER ------------------------------------------------------

  /*
    What: sends registration data to backend, creates user + profile
    When: called when user clicks "Register" button
    Returns: RegisterResponse { message, user } 
  */

  /*
    What: type for what register sends TO the backend
    Why: typed input = TypeScript catches missing fields immediately
  */

type RegisterInput = {
    full_name: string
    email: string
    password: string
    role: 'customer' | 'provider'
    phone?: string
}

export async function registerUser( data: RegisterInput ): Promise<RegisterResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify(data),

        credentials: 'include'
    })

    return handleResponse<RegisterResponse>(res)
}

// ----------------- GET ME ----------------------------------------------------------------------
  /*
    What: fetches current logged-in user using access token
    When: called on app load to check if user is still logged in
    Returns: { user: AuthUser } 
  */

export async function getMe(accessToken: string): Promise<{ user: AuthUser }> {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        method: 'GET',

        headers: {
            /*
              What: Bearer token in Authorization header
              Why: the authMiddleware reads this header to verify identity
            */
          'Authorization' : `Bearer ${accessToken}`,
        },
        
        credentials: 'include'
    })

    return handleResponse<{ user: AuthUser }>(res)
}


// ---------------------------------- LOG OUT ---------------------------------------------------------
  /*
    What: clears the refresh token cookie on the backend
    When: called when user clicks "Log out"
    Returns: { message: string } 
  */

export async function logoutUser( accessToken: string ): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include'                        // needed to clear the httpOnly cookie
    })

    return handleResponse<{ message: string }>(res)
}

// ------------------------- REFRESH TOKEN --------------------------------------------------------
  /*
    What: gets a new access token using the refresh token cookie
    When: called automatically when access token expires ( 401 response)
    Why: user stays logged in without re-entering password
    Returns: { accessToken: string } 
  */
export async function refreshAccessToken(): Promise<{ accessToken: string }> {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',

        /**
         * What: no Authorization header needed here
         * Why: refresh token comes from httpOnly cookie automatically
         *      browser sends it with credentials: 'include'
         */
        credentials: 'include',
    })

    return handleResponse<{ accessToken: string }>(res)
}