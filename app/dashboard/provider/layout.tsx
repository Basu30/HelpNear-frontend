// What; wraps ALL provider pages automatically
// Why: sidebar appears on every page without importing it each time
'use client'
import SideBar from "./sidebar";

export default function ProviderLayout({ children } : { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-white flex">
            <SideBar/>
            <div className="flex-1">
                {children}
            </div>
        </main>
    )
}