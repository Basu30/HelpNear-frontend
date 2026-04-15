'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getProviderJobs } from "@/services/provider.service";
import type { JobRequest } from "@/types/job";

const ProviderJobs = () => {
    const { token, isLoading } = useAuth();

    const [jobs, setJobs] = useState<JobRequest[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoading) return;

        if (!token) {
            setError("You must be logged in to view jobs.");
            setLoading(false);
            return;
        }

        const fetchJobs = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProviderJobs(token);
                setJobs(data.jobs || []);
                setCount(data.count ?? data.jobs.length);
            } catch (err) {
                console.error(err);

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load provider jobs.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isLoading, token]);

    const statusColors: Record<string, string> = {
        open: 'bg-green-100 text-green-700',
        quoted: 'bg-blue-100 text-blue-700',
        booked: 'bg-purple-100 text-purple-700',
        in_progress: 'bg-yellow-100 text-yellow-700',
        completed: 'bg-gray-100 text-gray-700',
        cancelled: 'bg-red-100 text-red-700',
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return "Flexible";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Flexible";

        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <main className="flex justify-center items-center min-h-[60vh] text-black">
                <p className="text-lg font-medium">Loading jobs...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex justify-center items-center min-h-[60vh]">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="text-black min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Available Jobs
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        {count} matching job{count !== 1 ? "s" : ""} found
                    </p>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-20 font-bold text-[1.5rem] bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <p>No matching jobs found right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
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
                                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                                statusColors[job.status] || 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {job.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {job.description || "No description provided."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">City</p>
                                            <p className="font-medium text-gray-800">{job.city}</p>
                                        </div>

                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">District</p>
                                            <p className="font-medium text-gray-800">
                                                {job.district || "Not specified"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">Min Budget</p>
                                            <p className="font-medium text-gray-800">
                                                {job.budget_min != null ? `$${job.budget_min}` : "Not set"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">Max Budget</p>
                                            <p className="font-medium text-gray-800">
                                                {job.budget_max != null ? `$${job.budget_max}` : "Not set"}
                                            </p>
                                        </div>

                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">Preferred Date</p>
                                            <p className="font-medium text-gray-800">
                                                {formatDate(job.preferred_date)}
                                            </p>
                                        </div>

                                        <div className="bg-gray-100 rounded-xl p-3">
                                            <p className="text-gray-400 text-xs mb-1">Preferred Time</p>
                                            <p className="font-medium text-gray-800">
                                                {job.preferred_time || "Flexible"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                                        View Details
                                    </button>

                                    {job.status === 'open' && (
                                        <button className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition">
                                            Send Quote
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProviderJobs;