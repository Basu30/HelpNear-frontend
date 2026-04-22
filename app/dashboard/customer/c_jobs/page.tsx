'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getCustomerJobs } from "@/services/jobs.service";
import type { JobRequest } from "@/types/job";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AllJobs() {
    const { token, isLoading} = useAuth();
    const router = useRouter()

    const [jobs, setJobs] = useState<JobRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState<string | null>(null)

    

    useEffect(() => {
        /**
         * What: don't fetch untill session is restored
         * Why: isLoading = true means we don't know if logged in yet fetching with null token = 401 error
         */
        if (isLoading) return
        if (!token) return 

        getCustomerJobs(token!)
       .then(data => setJobs(data.jobs))
       .catch(err => console.error(err))
       .finally(() => setLoading(false))
    }, [isLoading, token])                // re-runs when either changes

    const statusColors: Record<string, string> = {
        open:        'bg-green-100 text-green-700',
        quoted:      'bg-blue-100 text-blue-700',
        booked:      'bg-purple-100 text-purple-700',
        in_progress: 'bg-yellow-100 text-yellow-700',
        completed:   'bg-gray-100 text-gray-700',
        cancelled:   'bg-red-100 text-red-700',
    }

    if (loading) return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <p className="text-gray-400 text-lg">Loading your jobs...</p>
        </main>
    )

    if (error) {
        <main className="flex justify-center items-center min-h-[60vh]">
            <p className="text-red-500">{error}</p>
        </main>
    }
    

    return (
        <main className="text-black min-h-screen bg-gray-100 p-4">
            {jobs.length === 0 ? (
                <div className="text-center py-20">
                    <p>You have not posted any jobs yet</p>
                    <Link href={'/dashboard/customer/create_job'}>
                        Post your first job
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full ">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                                        {job.title}
                                    </h2>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[job.status]}`}
                                    >
                                        {job.status}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {job.description}
                                </p>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-gray-100 rounded-xl p-3">
                                        <p className="text-gray-400 text-xs mb-1">City</p>
                                        <p className="font-medium text-gray-800">{job.city}</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-xl p-3">
                                        <p className="text-gray-400 text-xs mb-1">District</p>
                                        <p className="font-medium text-gray-800">
                                        {job?.district || "Not specified"}
                                        </p>
                                    </div>

                                    <div className="bg-gray-100 rounded-xl p-3">
                                        <p className="text-gray-400 text-xs mb-1">Min Budget</p>
                                        <p className="font-medium text-gray-800">${job.budget_min ? `${job.budget_min}` : 'Not set'}</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-xl p-3">
                                        <p className="text-gray-400 text-xs mb-1">Max Budget</p>
                                        <p className="font-medium text-gray-800">${job.budget_max}</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-xl p-3 col-span-">
                                        <p className="text-gray-400 text-xs mb-1">Preferred Date</p>
                                        <p className="font-medium text-gray-800">
                                        {new Date(Number(job.preferred_date)).toLocaleDateString( 'en-CA', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }) || "Flexible"}
                                        </p>
                                    </div>

                                    <div className="bg-gray-100 rounded-xl p-3 col-span-">
                                        <p className="text-gray-400 text-xs mb-1">Preferred Time</p>
                                        <p className="font-medium text-gray-800">
                                        {new Date(Number(job.preferred_time)).toLocaleTimeString( 'en-CA', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        }) || "Flexible"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <button onClick={() => router.push(`/dashboard/customer/c_quotes/${job.id}?title=${encodeURIComponent(job.title)}`)} className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition active:scale-97">
                                    View Details
                                </button>

                                {job.status === 'open' && (
                                    <button className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition active:scale-97">
                                        Submut Quote
                                    </button>
                                )}
                                
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
        </main>
    )
}