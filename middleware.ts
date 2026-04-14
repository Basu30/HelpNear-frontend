/**
 * What: Next.js middleware - runs on the SERVER before any page loads
 * Why: protects routes without checking inside every single page
 * When: runs automatically on every request that matches the config below
 * Where: must be in the project root - Next.js looks for it there specifically
 */

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


/**
 * What: the middleware function - runs before every matched request
 * Why: intercept the request and decides allow or redirect
 * NextRequest: types version of the incoming request - has .cookies, .nextUrl etc
 */
export function middleware(request: NextRequest) {

    /**
     * What: reads the accessToken cookie from the incoming request
     * Why: this is how server knows if user is logged in 
     *      Context doesn't exists on server - only cookies travel with requests
     */
    const token = request.cookies.get('accessToken')?.value

    /**
     * What: the URL the user is trying to visit
     * Example: /dashboard/customer, /dashboard/provider/jobs
     */
    const { pathname } = request.nextUrl

    // ------- PROTECT DASHBOARD ROUTES -------
    /**
     * What: if user tries to access /dashboard/* without a token -> redirect
     * Why: unauthenticated users should never see dashboard pages
     * When: no coolie = not logged in = go to login page
     */

    if (pathname.startsWith('/dashboard') && !token) {

        /**
         * What: builds the redirect URL
         * Why: NextResponse.redirect() sends a 307 redirect response
         *      the browser follows it automatically
         */
        const loginUrl = new URL('/login', request.url)

        /**
         * What: adds ?from=/dashboard/customer to the redirect URL'
         * Why: after login I can redirect back to where they were going
         */
        loginUrl.searchParams.set('from', pathname)

        return NextResponse.redirect(loginUrl)
    }


    // --------- REDIRECT LOGGED-IN USERS AWAY FROM LOGIN ----------
    /**
     * What: if user is already loggod in and visits /login -> redirect to dashboard
     * Why: loggod-in users  have no reason to see the login page
     * When: cookie exists = already loggod in
     */
    if (pathname === '/login' && token) {
        /**
         * What: redirect to home/dashboard
         * Why: they're already loggod in send them somewhere useful
         */
        return NextResponse.redirect(new URL('/dashboard/customer', request.url))
    }


    /**
     * What: allow the request to continue normally
     * Why: if none of the rules above matched, let the page load
     * When: authenticated user accessing dashboard, or public pages
     */
    return NextResponse.next()
}

/**
 * What: tells Next.js which routes this middleware runs on
 * Why: without this, middleware runs on EVERY request including 
 *      images, fonts, API calls - very slow and unnecessary
 * matcher: array of path patterns to match
 */
export const confiG = {
    matcher: [
        '/dashboard/:path*', 
        '/login'
    ]
}