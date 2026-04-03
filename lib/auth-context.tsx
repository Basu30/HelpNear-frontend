'use client';
/**
 * What: React Context for authentication state
 * Why: any component in the app can access user + token
 *      without prop drillint or locaStorage reads
 * When: wraps the entire app in layout.tsx
 */
import { createContext, useContext, useState, ReactNode } from "react";
import type { AuthUser } from "@/services/auth.service";
import Cookies from "js-cookie";

/**
 * What: defines the shape of what Context provides
 * Why: TypeScript knows exactly what useAuth() returns
 */
type AuthContextType = {
    user: AuthUser | null                             // null when not logged in
    token: string | null                              // access token
    login: (token: string, user: AuthUser) => void    // called after loginUser()
    logout: () => void                                // clears everything
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

    /**
     * What: called by LoginPage AFTER loginUser() succeeds
     * Why: stores the result in context so whole app knows who is logged in 
     * When: called once on successful login
     */
    const login = (token: string, user: AuthUser) => {
        setUser(user)
        setToken(token)

        // Also store in cookie so middleware can read it
        Cookies.set('accessToken', token)
    }

    /**
     * What: clears all auth state
     * Why: on logout, no component should have access to user/token
     * When: called by logout button anywhere in the app
     */
    const logout = () => {
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
        <AuthContext.Provider value={{ user, token, login, logout }}>
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