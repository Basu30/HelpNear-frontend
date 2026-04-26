'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { getProviderQuotes, withDrawQuote } from "@/services/quotes.service";
import { useAuth } from "@/lib/auth-context";
import { Quote } from "@/types/quote";
import { useRouter } from "next/navigation";

export default function ProviderQuote() {
    const { isLoading, token} = useAuth();
    const router = useRouter()

    const [quotes, setQuotes] = useState<Quote[]>([])

    // UI
    const [error, setError] = useState<string | null>(null)

    // FETCH QUOTE DATA 
    useEffect(() => {
        if (isLoading) return

        getProviderQuotes(token!)
        .then(data => setQuotes(data.quotes))
        .catch((err) => console.error(err.message))
    }, [isLoading, token])


    // HANDLE WITHDRAW
    const handleWithdraw = async (quoteId: string) => {
        
        try {
            await withDrawQuote(quoteId, token!)

            setQuotes(prev => prev.filter(q => q.id !== quoteId))
        } catch (err) {
            if (err instanceof Error) setError(err.message)
        }
    }


   // DISPLAY AS STATUS
    const [navDisplay, setNavDisplay] = useState<"allQuotes" | "pending" | "accepted" | "withdrawn" | "rejected">("allQuotes");

    const tabClass = (tab: "allQuotes" | "pending" | "accepted" | "withdrawn" | "rejected") =>
        `flex-1 text-center font-bold cursor-pointer py-3  ${
            navDisplay === tab
                ? "italic border-b-3 border-blue-600 text-blue-600 translate-border-full truncate"
                : "text-black"
        }`;

    // FILTER AS STATUS
    const filterQuotes = navDisplay === "allQuotes" 
        ? quotes
        : quotes.filter(q => q.status === navDisplay.toLowerCase())


    // STATUS COLOR
    const statusColors: Record<string, string> = {
        accepted: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        withdrawn: 'bg-gray-100 text-gray-700',
        rejected: 'bg-red-100 text-red-700',
    }
    
    // EXPIRE QUOTE
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

    return (
        <main className="min-h-screen text-black md:py-24 px-64 p-2 border-2">
            <h1 className="md:text-[2rem] font-bold">My Quotes</h1>

            <div className="md:p-6">
                <nav className="w-full">
                    <ul className="flex border-b border-gray-300">
                        <li onClick={() => setNavDisplay("allQuotes")} className={tabClass("allQuotes")}>
                            All Quotes 
                            <span className="md:ml-2 md:py-0.5 md:px-2 rounded-full bg-blue-300 text-center">{quotes.length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("pending")} className={tabClass("pending")}>
                            Pending
                            <span className="ml-2 py-0.5 px-2  rounded-full bg-yellow-300 text-yellow-700 text-center">{quotes.filter(q => q.status === "pending").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("accepted")} className={tabClass("accepted")}>
                            Accepted
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-green-200 text-green-700 text-center">{quotes.filter(q => q.status === "accepted").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("withdrawn")} className={tabClass("withdrawn")}>
                            Withdrawn
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-gray-300 text-gray-700 text-center">{quotes.filter(q => q.status === "withdrawn").length}</span>
                        </li>
                        <li onClick={() => setNavDisplay("rejected")} className={tabClass("rejected")}>
                            Rejected
                            <span className="ml-2 py-0.5 px-2 rounded-full bg-red-300 text-red-700 text-center">{quotes.filter(q => q.status === "rejected").length}</span>
                        </li>
                    </ul>
                </nav>

                <div className="w-full mt-6">
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 md:text-md text-sm items-center flex rounded-lg md:px-2 md:px-4 p-1 mb-4 w-ma">
                        <span className="md:text-[1.2rem] mr-2">ⓘ</span> There are all quotes you have submitted to customers.
                    </div>

                    {quotes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border">
                            <p className="text-gray-500 text-lg">
                                No quotes yet —
                            </p>
                        </div>
                    ) : ( 
                        <div>
                            {filterQuotes.map((q) => (
                                <div key={q.id}>
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
                                                    <span className="font-bold md:text-[1.2rem]">{q.title}</span>
                                                    <span className="text-sm text-gray-600">📍{q.city} {q.district}</span>
                                                </div>
                                                <div className="grid grid-rows-2">
                                                    <span className="italic text-">
                                                        <strong className="font-bold">Customer: </strong> 
                                                        {q.customer_name}
                                                    </span>
                                                    <span className="italic">
                                                        <strong>Quoted on: </strong> 
                                                        {new Date(q.created_at).toLocaleDateString('en-CA', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            
                                            </div>
                                        </div>

                                        {/* QUOTED */}
                                        <div className="flex flex-col w-full items-center font-semibold">
                                            <span className=" md:text-[1.9rem]">${q.price}</span> 
                                            <span className="text-gray-400 italic md:text-[1.2rem]">Your Quote</span>
                                        </div>

                                        {/* Status + action */}
                                        <div className="md:flex flex-col border-l-1 border-gray-300 md:w-1/2 items-center">
                                            <span className={`inline-block px-3 py-1 rounded-full font-medium whitespace-nowrap ${statusColors[q.status]}`}>
                                                {q.status.toUpperCase()}
                                            </span>
                                            {q.status === 'pending' && (
                                                <>
                                                    <span className="font-medium">Expires in</span>
                                                    <span>{getExpiresIn(String(q.created_at))}</span>
                                                </>
                                               
                                            )}
                                            
                                            {q.status === "pending" && (
                                                <button 
                                                    onClick={() => handleWithdraw(q.id)} 
                                                    className="text-red-500 mt-2 font-bold border border-gray-200 rounded-md md:px-3 px-1 py-1 md:w-1/2 shadow-sm hover:bg-gray-200 active:scale-98">
                                                    Withdraw
                                                </button>
                                            )}
                                            {q.status === 'accepted' && (
                                                <button 
                                                    onClick={() => router.push('/dashboard/provider/accepted')} 
                                                    className=" mt-2 font-bold border border-gray-200 rounded-md md:px-3 px-1 py-1 md:w-1/2 shadow-sm bg-blue-400 text-white hover:bg-blue-600 active:scale-98">
                                                    View Booking
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