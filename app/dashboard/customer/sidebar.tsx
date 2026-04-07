import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation";
import Image from "next/image";


const SideBar = () => {

    const { logout } = useAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout()

        router.push('/login')
    }

    return (
        <nav className="md:flex hidden min-h-screen justify-between flex-col text-center text-black border-r-1 border-gray-300 rounded-xl xl:w-1/6 w-2/8">
            
            {/* <div className="flex flex-col justify-betwee border-1 "> */}
                <div className="flex justify-center items-center border-b-1 border-gray-300">
                    <Image
                        src={'/images/helpNear-logo.png'}
                        alt="HelpNear/OIRTUS"
                        width={100}
                        height={100}
                    />
                    
                    <h1 className="font-bold xl:text-[1.8rem] xl:py-4 ">HelpNear</h1>
                    
                </div>
                
                <ul className="flex flex-col items-start xl:px-15 xl:text-[1.3rem] ">
                    <li className="flex justify-evenly items-center rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out ">
                        {/* <Image
                            src={'/images/dashboard.png'}
                            alt="Dashboard"
                            width={20}
                            height={20}
                            className=""
                        /> */}
                        🏠 Dashboard
                    </li>
                    <li className="rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out">📋 My Jobs</li>
                    <li className="rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out">💬 Quotes</li>
                    <li className="rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out">📅 Bookings</li>
                    <li className="rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out">📩 Messages</li>
                    <li className="rounded-xl p-2 text-center hover:bg-gray-200 hover:text-blue-700 hover:scale-105 transition duration-200 ease-in-out">👤 Profile</li>
                </ul>

                <div className="mx-6 rounded-xl bg-blue-300 xl:py-50">Here could be Announcement</div>

                <div className="flex justify-center">
                    <button onClick={handleLogout} className="flex rounded-md mb-2 px-4 py-1 font-bolder text-white bg-blue-500 active:scale-98">
                        <Image 
                            src={'/images/logout.png'}
                            alt="Logout"
                            width={20}
                            height={10}
                            className="mx-4 "
                        />
                        Log out
                    </button>
                </div>
            
            {/* </div> */}
           
        </nav>
    )
}

export default SideBar