'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getProviderQuotes } from '@/services/quotes.service';
import { Quote } from '@/types/quote';

export default function AllJobQuotes() {
     const { token, isLoading } = useAuth();
    
        const [quotes, setQuotes] = useState<Quote[]>([]);
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
    
            // const fetchJobs = async () => {
            //     try {
            //         setLoading(true);
            //         setError(null);
    
            //         const data = await getProviderJobs(token);
            //         setJobs(data.jobs || []);
            //         setCount(data.count ?? data.jobs.length);
            //     } catch (err) {
            //         console.error(err);
    
            //         if (err instanceof Error) {
            //             setError(err.message);
            //         } else {
            //             setError("Failed to load provider jobs.");
            //         }
            //     } finally {
            //         setLoading(false);
            //     }
            // };
    
            const fetchAllQuotes = async () => {
                try {
                    setLoading(true);
                    setError(null);
    
                    const data = await getProviderQuotes(token);
                    setQuotes(data.quotes || []);
                    setCount(data.count ?? data.quotes.length);
                } catch (err) {
                    console.error(err)
                }
                finally {
                    setLoading(false)
                }
            }
    
            fetchAllQuotes();
        }, [isLoading]);
    return (
        <main className="text-black">
            <h1>All jobs with quotes</h1>
        </main>
    )
}