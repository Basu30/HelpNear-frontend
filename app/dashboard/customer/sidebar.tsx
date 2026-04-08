'use client'
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {

    const pathname = usePathname();

    const { logout } = useAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout()

        router.push('/login')
    }

    return (
        <nav className="md:flex hidden min-h-screen justify-between flex-col text-center text-black border-r-1 border-gray-300 rounded-xl xl:w-1/6 w-2/8">
            <div className="flex justify-center items-center border-b-1 border-gray-300">
                <Image
                    src={'/images/helpNear-logo.png'}
                    alt="HelpNear/OIRTUS"
                    width={100}
                    height={100}
                />
                
                <h1 className="font-bold xl:text-[1.8rem] xl:py-4 ">HelpNear</h1>
                
            </div>
            
            <ul className="flex flex-col items-start xl:px-20 xl:text-[1.3rem] ">
                <li  className={`flex justify-evenly items-center rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'text-black'}`}>
                    {/* <Image
                        src={'/images/dashboard.png'}
                        alt="Dashboard"
                        width={20}
                        height={20}
                        className=""
                    /> */}
                    <Link href={'/dashboard/customer'}>
                        🏠 Dashboard
                    </Link>
                    
                </li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out${pathname === '/dashboard/customer/c-jobs' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'text-black'}`}>
                    <Link href={'/dashboard/customer/c_jobs'}>
                        📋 My Job
                    </Link>s
                </li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer/c_quotes' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'text-black'}`}>
                    <Link href={'/dashboard/customer/c_quotes'}>
                        💬 Quotes
                    </Link>
                </li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer/booking' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'text-black'}`}>
                    <Link href={'/dashboard/customer/booking'}>
                        📅 Bookings
                    </Link>
                </li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer/c_messages' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'text-black'}`}>
                    <Link href={'/dashboard/customer/c_messages'}>
                        📩 Messages
                    </Link></li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer/c_profile' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'tex-tblack'}`}>
                    <Link href={'/dashboard/customer/c_profile'}>
                        👤 Profile
                    </Link>
                </li>
                <li className={`rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ${pathname === '/dashboard/customer/create_job' ? 'bg-blue-100 text-blue-700 font-bold italic' : 'tex-tblack'}`}>
                    <Link href={'/dashboard/customer/create_job'}>
                        👤 Create Job
                    </Link>
                </li>
            </ul>

            <div className="mx-6 rounded-xl bg-blue-300 md:py-50">Here could be Announcement</div>

            <div className="flex justify-center">
                <button onClick={handleLogout} className="flex rounded-md mb-2 px-4 py-1 font-bolder text-white bg-blue-500 hover:bg-blue-600 active:scale-98">
                    <Image 
                        src={'/images/logout.png'}
                        alt="Logout"
                        width={20}
                        height={10}
                        className="mx-4 h-auto w-auto"
                    />
                    Log out
                </button>
            </div>
        </nav>
    )
}

export default SideBar