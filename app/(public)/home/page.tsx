'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Category, getAllJobs, getCategories } from '@/services/jobs.service';
import { getAllProviders } from '@/services/provider.service';
import { JobRequest } from '@/types/job';
import { ProviderProfile } from '@/types/providerProfile';

// const jobs = [
//   { title: 'House Deep Cleaning', category: 'Cleaning', location: 'Calgary, AB', price: '$120 - $180', time: '2h ago', image: '/images/cleaning.jpg' },
//   { title: 'Kitchen Faucet Fix', category: 'Plumbing', location: 'Okotoks, AB', price: '$90 - $140', time: '3h ago', image: '/images/plumbing.jpg' },
//   { title: 'Furniture Assembly', category: 'Handyman', location: 'Calgary, AB', price: '$60 - $100', time: '4h ago', image: '/images/handyman.jpg' },
//   { title: 'Wall Painting', category: 'Painting', location: 'Chestermere, AB', price: '$200 - $350', time: '5h ago', image: '/images/painting.jpg' },
//   { title: 'Lawn Mowing', category: 'Yard Work', location: 'Calgary, AB', price: '$40 - $70', time: '6h ago', image: '/images/lawn.jpg' },
//   { title: 'Bathroom Repair', category: 'Plumbing', location: 'Airdrie, AB', price: '$80 - $120', time: '7h ago', image: '/images/bathroom.jpg' },
// ];

// const providers = [
//   { name: 'Basu Provider', skill: 'Home Repair', rating: '4.9', reviews: 124, jobs: 128 },
//   { name: 'Sarah CleanPro', skill: 'Cleaning', rating: '4.8', reviews: 98, jobs: 96 },
//   { name: 'Mike Plumbing', skill: 'Plumbing', rating: '4.7', reviews: 86, jobs: 112 },
//   { name: 'John Handyman', skill: 'Handyman', rating: '4.9', reviews: 110, jobs: 145 },
// ];

const categoryEmojis: Record<string, string> = {
    'Cleaning':        '🧹',
    'Moving Help':     '🚚',
    'Handyman':        '🛠️',
    'Plumbing':        '🚰',
    'Electrical':      '⚡',
    'Computer Repair': '💻',
};

export default function HomePage() {
    const { isLoading, token } = useAuth()

    const [jobs, setJobs] = useState<JobRequest[]>([])
    const [providers, setProviders] = useState<ProviderProfile[]>([]);
    const [categories, setCategories] = useState<Category[]>([])


    // GET ALL JOBS, ALL PROVIDERS AND ALL CATEGORIES
    useEffect(() => {
        if (isLoading) return

        Promise.all([
            getAllJobs(1, 10),
            getAllProviders(),
            getCategories(),
        ])
            .then(([jobsData, providersData, categoriesData]) => {
                setJobs(jobsData.jobs)
                setProviders(providersData.providers)
                setCategories(categoriesData.categories)
            })
            .catch(err => console.error(err.message))
    }, [ isLoading ])

   
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="h-20 border-b border-slate-200 px-6 md:px-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-20 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Image
                src='/images/helpnear-logo.png'
                alt='logo'
                width={100}
                height={100}
                className='w-auto h-auto object-cover'/>
          </div>
          HelpNear/ OIRTUS
        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link href="#browseJobs" className="hover:bg-gray-200 px-2 py-1 rounded transition-all duration-400">Browse Jobs</Link>
          <Link href="#howItWorks" className="hover:bg-gray-200 px-2 py-1 rounded transition-all duration-400">How it Works</Link>
          <Link href="#categories" className="hover:bg-gray-200 px-2 py-1 rounded transition-all duration-400">Categories</Link>
          <Link href="#providers" className="hover:bg-gray-200 px-2 py-1 rounded transition-all duration-400">For Providers</Link>
        </nav>

        <div className="flex gap-3 text-sm">
          <Link href="/login" className="md:px-5 px-2 md:py-2 py-0.5 md:rounded-lg rounded bg-blue-600 text-white hover:bg-blue-800 active:scale-98">
            Log in
          </Link>
        </div>
      </header>

      <section className="xl:px-48 px-6 md:py-20 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-slate-200">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find trusted professionals <br />
            for <span className="text-blue-600">any job, fast.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Post a job, get quotes from verified providers, choose the best offer and get it done.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href={ token ? "/dashboard/customer/create_job" : '/login'} className="md:text-2xl text-sm md:px-8 px-6 py-4 flex items-center rounded-xl bg-blue-600 text-white font-semibold">
              Post a Job
            </Link>
            <Link href="/jobs" className="md:text-2xl text-sm md:px-8 px-6 py-4 flex items-center rounded-xl border border-blue-600 text-blue-600 font-semibold">
              Browse Jobs
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap md:gap-10 xl:w-4/5 items-center justify-between">
            <div className='text-center'>
              <p className="text-blue-600 text-2xl">🛡️</p>
              <p className="font-semibold xl:text-[2rem] text-lg">Verified</p>
              <p className="text-sm text-slate-500">Professionals</p>
            </div>
            <div className='text-center'>
              <p className="text-blue-600 text-2xl">⭐</p>
              <p className="font-semibold  xl:text-[2rem] text-lg">4.8/5</p>
              <p className="text-sm text-slate-500">Average Rating</p>
            </div>
            <div className='text-center'>
              <p className="text-blue-600 text-2xl">👥</p>
              <p className="font-semibold xl:text-[2rem] text-lg">500+</p>
              <p className="text-sm text-slate-500">Jobs Completed</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block rounded-[3rem] overflow-hidden bg-blue-50">
          <Image
            src="/images/helpNear-logo.png"
            alt="Worker"
            width={200}
            height={200}
            className="md:w-full md:h-[700px] object-cover"
          />
        </div>
      </section>

      <section id='howItWorks' className="px-6 md:px-36 py-10 border-b border-slate-200">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
          {[
            ['📄', 'Post', 'Tell us what job you need done and set your budget.'],
            ['💬', 'Quote', 'Receive quotes from interested and trusted providers.'],
            ['✅', 'Done', 'Choose the best offer and get your job done.'],
          ].map(([icon, title, desc], index) => (
            <div key={title}>
              <div className="mx-auto w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-4xl relative">
                {icon}
                <span className="absolute -top-3 bg-blue-600 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

{/* JOBS */}
      <section id="browseJobs" className="px-6 xl:px-36 py-8 border-b border-slate-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="xl:text-4xl font-bold">Browse jobs</h2>
            <p className="text-slate-500 text-sm mt-1">Check out the latest jobs posted by customers.</p>
          </div>
          <Link href="/jobs" className="text-blue-600 font-semibold xl:text-[1.8rem] text-sm">
            View all jobs ›
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-52 bg-slate-100 mb-8">
                    <Image
                        src={'/images/helpNear-logo.png'} 
                        alt={job.title} 
                        width={50}
                        height={50}
                        className="w-full h-full object-cover " 
                    />
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 ml-2 rounded">
                        {job.category_name}
                    </span>
                </div>
                <div className="p-4">
                
                    <h3 className="font-bold mt-3 text-sm">{job.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">📍 {job.city}</p>
                    <p className="text-green-600 font-bold mt-3 text-[1.4rem]">${job.budget_min} - {job.budget_max}</p>
                    <p className="text-xs text-slate-400 mt-3">📅 {job.preferred_date ? new Date(job.preferred_date).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : 'Flexible'}</p>
                    <p className="text-xs text-slate-400 mt-3">⌚ {job.preferred_time ?? 'Any time'}</p>
                </div>
            </div>
          ))}
        </div>
      </section>

{/* PROVIDERS */}
      <section id='providers' className="px-6 xl:px-36 py-8 border-b border-slate-200">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="xl:text-4xl font-bold">Top rated providers</h2>
            <p className="text-slate-500 text-sm mt-1">Connect with highly rated and verified professionals.</p>
          </div>
          <Link href="/providers" className="text-blue-600 font-semibold xl:text-[1.8rem] text-sm">
            View all providers ›
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-5">
          {providers.map((provider) => (
            <div key={provider.id} className="border border-slate-200 rounded-xl p-6 flex gap-4 items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xl">{provider.full_name}</h3>
                <p className="text-sm text-slate-500">📍 {provider.city ?? 'Unknown'}</p>
                <p className="text-sm mt-1">⭐ {provider.average_rating} ({provider.total_reviews} reviews)</p>
                <p className="text-sm text-slate-500">✔️ {provider.completed_jobs} jobs completed</p>
                <p className="text-sm text-blue-600 mt-2">🛡 {provider.is_verified === true ? 'Verified' : 'Unverified'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* CATEGORIES */}
      <section id='categories' className="px-6 xl:px-36 py-8">
        <h2 className="text-2xl font-bold">Service categories</h2>
        <p className="text-slate-500 text-sm mt-1">Find the right professional for your job category.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.name.toLowerCase().replaceAll(' ', '-')}`}
              className="border border-slate-200 rounded-xl p-8 text-center hover:border-blue-500 hover:shadow-md transition"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
                {categoryEmojis[c.name]}
              </div>
              <p className="font-bold mt-4 text-[1.4rem]">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}