'use client';
/**
 * What: React Context for authentication state
 * Why: any component in the app can access user + token
 *      without prop drillint or locaStorage reads
 * When: wraps the entire app in layout.tsx
 */
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { AuthUser } from "@/services/auth.service";
import Cookies from "js-cookie";
import { getMe } from "@/services/auth.service";

/**
 * What: defines the shape of what Context provides
 * Why: TypeScript knows exactly what useAuth() returns
 */
type AuthContextType = {
    user: AuthUser | null                             // null when not logged in
    token: string | null                              // access token
    login: (token: string, user: AuthUser) => void    // called after loginUser()
    logout: () => void                                // clears everything
    isLoading: boolean                                // prevents flash of wrong content
}

/**
 * What: creates the context with null as default
 * Why: null default forces useAuth() to check if it's inside a provider
 * When: created once at module level -- not inside a component
 */
const AuthContext = createContext<AuthContextType | null>(null)


/**
 * What: the provider component that holds state
 * Why: wraps the app so all children can access auth state
 * When: used in layout.tsx to wrap everything 
 * { children }: { children: ReactNode } - typed children prop
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    /**
     * What: on app load, check if token cookie exists
     * Why: after page refresh, React stata is gone but cookie remains
     * When: runs once when AuthProvider first mounts
     */
    useEffect(() => {
        const restoreSession = async () => {

            // Read token from cookie
            const saveToken = Cookies.get('accessToken')

            if (saveToken) {
                try {
                    /**
                     * What: call /auth/me with the saved token
                     * Why: verify token is still valid + get user data
                     */
                    const data = await getMe(saveToken)
                    setToken(saveToken)
                    setUser(data.user)
                } catch (err) {
                    /**
                     * What: token exists but is invalid/expired
                     * Why: clear it so user gets redirected to login
                     */
                    Cookies.remove('accessToken')
                    setToken(null)
                    setUser(null)
                }
            }
            /**
             * What: session restore attempt is done
             * Why: now pages can safely ckeck if user is logged in
             */
            setIsLoading(false)
        }
        restoreSession()
    }, [])  // empty array = run once on mount

    /**
     * What: called by LoginPage AFTER loginUser() succeeds
     * Why: stores the result in context so whole app knows who is logged in 
     * When: called once on successful login
     */
    const login = (token: string, user: AuthUser): void => {
        setUser(user)
        setToken(token)

        // Also store in cookie so middleware can read it
        Cookies.set('accessToken', token, {
            expires: 1 / 96,
            sameSite: 'strict',
        })
    }

    /**
     * What: clears all auth state
     * Why: on logout, no component should have access to user/token
     * When: called by logout button anywhere in the app
     */
    const logout = (): void => {
        setUser(null)
        setToken(null)

        Cookies.remove('accessToken')
    }

    /**
     * What: wraps children with the context value
     * Why: value prop passes { user, token, login, logout } to all children
     * When: renders once - wraps the entire app
     */
    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

/**
 * What: custome hook to consume the context
 * Why: instead of useContext(AuthContext) everywhere,
 *      useAuth() is cleaner and throws helpful error if misused
 * When: called in any component that needs user or token
 * Usage: const { user, token, login, logout } = useAuth()
 */
export function useAuth() {
    const context = useContext(AuthContext)

    /**
     * What: throws if useAuth() is called outside AuthProvider
     * Why:  without this check, context would be null and crash silently
     */
    if (!context) {
        throw new Error('useAuth must be used inside Authprovider')
    }

    return context
}