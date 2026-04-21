'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getJobQuotes, acceptQuote, QuoteWithProvider } from "@/services/quotes.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CustomerQuote() {
    const { isLoading, token } = useAuth();
    const { jobId } = useParams();
    const searchParams = useSearchParams()
    const router = useRouter();

    const jobTitle = searchParams.get("title")

    const [quotes, setQuotes] = useState<QuoteWithProvider[]>([])
    const [accepting, setAccepting] = useState<string | null>(null)

    // UI
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        if (isLoading) return

        getJobQuotes(String(jobId), token!)
            .then(data => setQuotes(data.quotes))
            .catch(err => console.error(err.message))
            .finally(() => setLoading(false))
    }, [isLoading, token])

    // HANDLE ACCEPT
    const handleAccept = async (quoteId: string) => {
        setAccepting(quoteId)
        setError(null)

        try {
            await acceptQuote(quoteId, token!)
            router.push('/dashboard/customer/booking')
        } catch (err) {
            if (err instanceof Error) setError(err.message)
        } finally {
            setAccepting(null)
        }
    }

    if (loading) return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <p className="text-gray-400">Loading quotes...</p>
        </main>
    )

    if (error) return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <p className="text-red-500">{error}</p>
        </main>
    )

    return (
        <main className="min-h-screen bg-slate-50 text-black px-4 md:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900">
                        Quotes for {jobTitle}
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base mt-2">
                        Job Posted on April 17, 2026 • Job ID: #{jobId}
                    </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 md:p-5 mb-8">
                    <h2 className="font-semibold text-green-800 text-lg md:text-xl">
                        You have received {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for this job
                    </h2>
                    <p className="text-green-700 text-sm md:text-base mt-1">
                        Choose the best offer that fits your needs.
                    </p>
                </div>

                {/* EMPTY STATE */}
                {quotes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border">
                        <p className="text-gray-500 text-lg">
                            No quotes yet — providers will respond soon
                        </p>
                    </div>
                ) : ( 
                    <div>

                        {quotes.map((quote) => (
                            <div key={quote.id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition p-4 md:p-6">

                                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.7fr] gap-6 items-start">
                                    
                                    {/* PROVIDER INFO */}
                                    <div className="flex gap-4">
                                        <Image
                                            src="/images/Basu3.JPEG"
                                            alt="Provider"
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-full object-cover border border-slate-200"
                                        />

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                                                    {quote.provider_name}
                                                </h2>
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                                    Verified
                                                </span>
                                            </div>

                                            <p className="text-sm text-slate-500 mt-1">
                                                ⭐ {quote.average_rating} - ({quote.provider_reviews ?? 0} reviews)
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {quote.provider_city}
                                            </p>
                                            <p className="text-sm text-slate-500 mt-3">
                                                Available: April 20, 2026
                                            </p>
                                        </div>
                                    </div>

                                    {/* MESSAGE */}
                                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                                        <p className="text-sm font-semibold text-slate-700 mb-2">
                                            Message
                                        </p>
                                        <p className="text-sm md:text-base text-slate-600 leading-7">
                                            Hi! I can complete this job with high quality service. I have all
                                            the necessary equipment.{quote.message}
                                        </p>
                                    </div>

                                    {/* PRICE AND TIME */}
                                    <div className="flex flex-col lg:items-end gap-2">
                                        <h3 className="text-3xl font-bold text-slate-900">${quote.price}</h3>
                                        <p className="text-sm text-slate-500">Estimated time</p>
                                        <p className="text-sm md:text-base font-medium text-slate-700">
                                            {quote.estimated_time}
                                        </p>
                                    </div>
                                </div>
                        

                                {/* ACTIONS */}
                                <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                                    <button className="px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-100 transition active:scale-98">
                                        View Details
                                    </button>

                                    <button 
                                        onClick={() => handleAccept(quote.id)}
                                        className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm active:scale-98">
                                        Accept Quote
                                    </button>
                                </div>
                           
                            </div> 
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}