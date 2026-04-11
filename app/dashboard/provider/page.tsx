'use client'
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";


export default function ProviderDashboard(){
     const { logout } = useAuth();
        const router = useRouter()
    
        const handleLogout = () => {
            const confirm = window.confirm('Confirm to log out!')
            if (!confirm) {
                return
            }
            logout()
    
            router.push('/login')
        }
    return (
        <main className="min-h-screen bg-white text-black text-center">
            <h1 className="text-black text-[2rem]">Provider Dashboard</h1>
            <div className="flex justify-center">
                            <button onClick={handleLogout} className="flex rounded-md mb-2 px-4 py-1 font-bolder text-white bg-blue-500 hover:bg-blue-600 active:scale-98">
                                {/* <Image 
                                    src={'/images/logout.png'}
                                    alt="Logout"
                                    width={20}
                                    height={10}
                                    className="mx-4 h-auto w-auto"
                                /> */}
                                Log out
                            </button>
                        </div>
        </main>
    )
}