'use client'
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation";

export default function CustomerDashboard(){
    const { logout } = useAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout()

        router.push('/login')
    }
    return (
        <main className="min-h-screen bg-white text-center text-black">
            <h1 className="text-black text-[2rem]">Customer Dashboard</h1>
            <button onClick={handleLogout} className="active:scale-97">Log out</button>
        </main>
    )
}