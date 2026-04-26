'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { cancelBooking, getCustomerBookings } from "@/services/booking.service";
import type { Booking } from "@/types/booking";



export default function Booking () {
    const { isLoading, token } = useAuth();
    const router = useRouter();

    const [booking, setbooking] = useState<Booking[]>([])
    
    // UI
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState<string | null>(null)

    useEffect(() => {
        if (isLoading) return

        getCustomerBookings(token!)
        .then(data => setbooking(data.bookings))
        .catch((err) => console.error(err.message))
    },  [isLoading, token])


    // DISPLAY AS STATUS
    const [navDisplay, setNavDisplay] = useState<"all" | "confirmed" | "in_progress" | "completed" | "cancelled">("all");

    const tabClass = (tab: "all" | "confirmed" | "in_progress" | "completed" | "cancelled") =>
        `flex-1 text-center font-bold cursor-pointer py-3  ${
            navDisplay === tab
                ? "italic border-b-3 border-blue-600 text-blue-600 translate-border-full truncate"
                : "text-black"
        }`;

    // FILTER AS STATUS
    const filterbooking = navDisplay === "all" 
        ? booking
        : booking.filter(booking => booking.status === navDisplay.toLowerCase())


    // STATUS COLOR
    const statusColors: Record<string, string> = {
        in_progress: 'bg-green-100 text-green-700',
        confirmed: 'bg-yellow-100 text-yellow-700',
        completed: 'bg-gray-100 text-gray-700',
        cancelled: 'bg-red-100 text-red-700',
    }
    
    // EXPIRE bookingUOTE
    const  getExpiresIn = (createAt: string): string => {
        const created = new Date(createAt)
        const expires = new Date(created.getTime() +24 * 60 * 60 * 1000) // +24
        const now = new Date()
        const diffMs = expires.getTime() - now.getTime()

        if (diffMs <= 0) return 'Expired'

        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        return `${hours}h ${minutes}m` 
    }


    const handleCancel = async (bookingId: string) => {
        const confirmed = window.confirm('You are about to cancel this booking')

        if (!confirmed) return
        
        try {
            await cancelBooking(bookingId, {}, token!)

            setbooking(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b ))
        } catch (err) {
            if (err instanceof Error) setError(err.message)
        }
    }

    if (!loading) return <p className="text-[2rem] text-black text-center">Loading...</p>
    if (error)   return <p className="text-red-500">{error}</p>

    return (
        <main className="min-h-screen text-black md:p-24 p-2 border-2">
            <h1 className="md:text-[2rem] font-bold">My Bookings</h1>

            <div className="md:p-6">
                <nav className="w-full">
                    <ul className="flex border-b border-gray-300">
                        <li onClick={() => setNavDisplay("all")} className={tabClass("all")}>
                            All booking 
                            <span className="md:ml-2 md:py-0.5 md:px-2 rounded-full bg-blue-300 text-center">{booking.length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("confirmed")} className={tabClass("confirmed")}>
                            Confirmed
                            <span className="ml-2 py-0.5 px-2  rounded-full bg-yellow-300 text-yellow-700 text-center">{booking.filter(booking => booking.status === "confirmed").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("in_progress")} className={tabClass("in_progress")}>
                            In progress
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-green-200 text-green-700 text-center">{booking.filter(booking => booking.status === "in_progress").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("completed")} className={tabClass("completed")}>
                            Completed
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-gray-300 text-gray-700 text-center">{booking.filter(booking => booking.status === "completed").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("cancelled")} className={tabClass("cancelled")}>
                            Cancelled
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-red-300 text-red-700 text-center">{booking.filter(booking => booking.status === "cancelled").length}</span>
                        </li>
                    </ul>
                </nav>

                <div className="w-full mt-6">
                    <div className="bg-[#d5dbf7] text-[#2d80fa] md:text-lg text-sm items-center flex font-small italic rounded-lg md:px-2 md:px-4 p-1 mb-4 w-max">
                        <span className="md:text-[1.5rem] mr-2 ">ⓘ</span> There are all booking you have submitted to customers.
                    </div>

                    {booking.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border">
                            <p className="text-gray-500 text-lg">
                                No booking yet —
                            </p>
                        </div>
                    ) : ( 
                        <div>
                            {filterbooking.map((booking) => (
                                <div key={booking.id}>
                                    <div className="md:flex justify-between items-center justify-center border border-gray-300 rounded-xl md:p-4 p-2 md:gap-4 mt-4 shadow-sm hover:shadow-lg transition-all duration-300">
                                        <div className="flex w-full gap-3">
                                            <Image
                                                src="/images/t.jpg"
                                                alt="Photo"
                                                width={50}
                                                height={50}
                                                className="object-cover w-25 h-30 rounded-xl"
                                            />
                                            <div className="flex flex-col justify-evenly text-[1rem]">
                                                <div className="grid grid-rows-2">
                                                    <span className="font-bold md:text-[1.2rem]">{booking.title}</span>
                                                    <span className="text-sm text-gray-600">{booking.city} {booking.district}</span>
                                                </div>
                                                <div className="grid grid-rows-2">
                                                    <span className="italic text-">
                                                        <strong>Provider: </strong> 
                                                        {booking.provider_name}
                                                    </span>
                                                    <span className="italic">
                                                        <strong>booked on: </strong> 
                                                        {new Date(booking.created_at).toLocaleDateString('en-CA', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            
                                            </div>
                                        </div>

                                        {/* bookingUOTED */}
                                        <div className="flex flex-col w-full items-center font-semibold">
                                            <span className=" md:text-[1.9rem]">${booking.price}</span> 
                                            <span className="text-gray-400 italic md:text-[1.2rem]">Total price</span>
                                        </div>

                                        {/* Status + action */}
                                        <div className="md:flex flex-col border-l-1 border-gray-300 md:w-1/2 items-center">
                                            <span className={`inline-block px-3 py-1 rounded-full font-medium whitespace-nowrap ${statusColors[booking.status]}`}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                            {booking.status === 'confirmed' && (
                                                <>
                                                    <span className="font-medium">Expires in</span>
                                                    <span>{getExpiresIn(String(booking.created_at))}</span>
                                                </>
                                                
                                            )}
                                            
                                            {booking.status === "confirmed" && (
                                                <button 
                                                    onClick={() => handleCancel(booking.id)}
                                                    className="text-red-500 mt-2 font-bold border border-gray-200 rounded-md md:px-3 px-1 py-1 md:w-1/2 shadow-sm hover:bg-gray-200 active:scale-98">
                                                    Cancel
                                                </button>
                                            )}
                                            {booking.status ===  'completed'  && (
                                                <button 
                                                    onClick={() => router.push(`/dashboard/customer/booking/${booking.id}`)} 
                                                    className=" mt-2 font-bold border border-gray-200 rounded-md md:px-3 px-1 py-1 md:w-1/2 shadow-sm bg-blue-400 text-white hover:bg-blue-600 active:scale-98">
                                                    View
                                                </button>
                                            )} 
                                            
                                        </div>
                                    </div>
                                </div>       
                            ))}                 
                        </div>
                    )}   
                </div>
            </div>
        </main>
    );
}
