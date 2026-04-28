import Image from "next/image";
import Link from "next/link";


const jobs = [
  { title: 'House Deep Cleaning', category: 'Cleaning', location: 'Calgary, AB', price: '$120 - $180', time: '2h ago', image: '/images/cleaning.jpg' },
  { title: 'Kitchen Faucet Fix', category: 'Plumbing', location: 'Okotoks, AB', price: '$90 - $140', time: '3h ago', image: '/images/plumbing.jpg' },
  { title: 'Furniture Assembly', category: 'Handyman', location: 'Calgary, AB', price: '$60 - $100', time: '4h ago', image: '/images/handyman.jpg' },
  { title: 'Wall Painting', category: 'Painting', location: 'Chestermere, AB', price: '$200 - $350', time: '5h ago', image: '/images/painting.jpg' },
  { title: 'Lawn Mowing', category: 'Yard Work', location: 'Calgary, AB', price: '$40 - $70', time: '6h ago', image: '/images/lawn.jpg' },
  { title: 'Bathroom Repair', category: 'Plumbing', location: 'Airdrie, AB', price: '$80 - $120', time: '7h ago', image: '/images/bathroom.jpg' },
];

const providers = [
  { name: 'Basu Provider', skill: 'Home Repair', rating: '4.9', reviews: 124, jobs: 128 },
  { name: 'Sarah CleanPro', skill: 'Cleaning', rating: '4.8', reviews: 98, jobs: 96 },
  { name: 'Mike Plumbing', skill: 'Plumbing', rating: '4.7', reviews: 86, jobs: 112 },
  { name: 'John Handyman', skill: 'Handyman', rating: '4.9', reviews: 110, jobs: 145 },
];

// const categoryEmojis: Record<string, string> = {
//     'Cleaning':        '🧹',
//     'Moving Help':     '🚚',
//     'Handyman':        '🛠️',
//     'Plumbing':        '🚰',
//     'Electrical':      '⚡',
//     'Computer Repair': '💻',
// };
const categories = [
  ['🧹', 'Cleaning'],
  ['🚰', 'Plumbing'],
  ['⚡', 'Electrical'],
  ['🎨', 'Painting'],
  ['🛋️', 'Furniture'],
  ['🌿', 'Yard Work'],
  ['🚚', 'Moving'],
  ['🛠️', 'Handyman'],
  ['🔧', 'Appliance Repair'],
  ['•••', 'More'],
];

export default function JobsPage () {

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="h-20 border-b border-slate-200 px-6 md:px-14 flex items-center justify-between">
        <Link href={'/home'} className="flex items-center gap-2 font-bold text-xl">
          <div className="w-20 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Image
              src='/images/helpnear-logo.png'
              alt='logo'
              width={100}
              height={100}
              className='w-auto h-auto object-cover'
            />
          </div>

          HelpNear/ OIRTUS
        </Link>

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

      <section className="px-8 mt-4 items-center  border-slate-200">
        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Browse Jobs 
            </h1>
            <p className="md:text-lg text-xs text-slate-600 max-w-xl">
              Find jobs posted by customers and send your best quotes.
            </p>
          </div>
          
          <div className="flex w-1/2 items-center ">
            <div className=" flex w-1/2 md:py-2 text-black rounded-l-md border-b border-l border-t border-gray-300 hover:bg-gray-300">
              <Image
                src={'/images/search.png'}
                alt="Search"
                width={25}
                height={10}
                className="px-2 w-auto h-auto text-white"
              />
              <input
                title="Search" 
                placeholder="Search job title, keywords..."
                className="w-full ml-2 border-none outline-none"
              />
                
            </div>
            <div className=" flex md:py-2 text-black rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-300 ">
              <Image
                src={'/images/pin.png'}
                alt="Location"
                width={20}
                height={10}
                className="px-2 w-10 h-5"
              />
              <input
                title="Location" 
                placeholder="Location"
                className="w-full ml-2 border-none outline-none"
              />
            </div>

            <div className='text-center ml-4'>
              <button className="bg-blue-500 text-white rounded md:py-2 md:px-4 px-1 active:scale-98 hover:bg-blue-700">Search</button>
            </div>

          </div>
        </div>
      </section>

      <div className="md:flex hidden mx-8 my-6 gap-6">
        <section id='providers' className="flex flex-col justify-between items-center py-2 px-2 w-2/9 border rounded-lg border-slate-300 ">
          
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex justify-between w-full">
              <h2 className="xl:text-xl font-bold">Filter all</h2>
              <button className="text-blue-600 font-medium text-sm hover:text-blue-900 active:scale-98">Clear all</button>
            </div>
          </div>
          
          {/* CATEGORIES */}
          <div className="flex flex-col justify-end items-center w-full m-2">
            <h2 className="xl:text-xl font-medium text-left w-full">Categories</h2>
            <div className="flex justify-center items-center w-5/6 m-2 border border-slate-300 rounded py-2 px-2">
              <select className="w-full px-2 text-slate-500 font-medium text-sm border-none outline-none">
                <option>All Categories</option>
                <option>Electrical</option>
                <option>Handyman</option>
                <option>Cleaning</option>
                <option>Moving Help</option>
                <option>Computer Repair</option>
                <option>Plumbing</option>
              </select>
            </div>
          </div>

          {/* lOCATION */}
          <div className="flex flex-col justify-between items-center w-full m-2">
            <h2 className="xl:text-xl font-medium text-left w-full">Location</h2>
            <div className="flex justify-center items-center w-5/6 m-2 border border-slate-300 rounded py-2 px-2">
              <input
                type="text"
                placeholder="City or District"
                className="border-none outline-none w-full px-2"/>
            </div>
          </div>

          {/* BUDGET */}
          <div className="flex flex-col justify-between items-center m-2 w-full">
            <h2 className="xl:text-xl font-medium text-left w-full">Budget</h2>
            <div className="flex justify-between gap-3 w-5/6 items-center m-2">
              <input
                type="number"
                placeholder="Min"
                className="border border-slate-300 rounded w-30 py-2 px-2 outline-none"
              /> - 
              <input
                type="number"
                placeholder="Max"
                className="border border-slate-300 rounded w-30 py-2 px-2 outline-none"/>
            </div>
          </div>

          {/* SORT BY */}
          <div className="flex flex-col justify-between items-center m-2 w-full">
            <h2 className="xl:text-xl font-medium text-left w-full">Sort by</h2>
            <div className="flex justify-center items-center w-5/6 m-2 border border-slate-300 rounded py-2 px-2">
              <select className="w-full text-slate-500">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* POSTED WITHIN */}
          <div className="flex flex-col justify-between items-center m-2 w-full">
            <h2 className="xl:text-xl font-medium text-left w-full">Posted within</h2>
            <div className="flex justify-center items-center w-5/6 m-2 border border-slate-300 rounded py-2 px-2">
              <select className="w-full text-slate-500 outline-none">
                <option>Any time</option>
                <option>Within 24 hours</option>
                <option>A week</option>
              </select>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <button className="w-4/5 rounded-lg bg-blue-500 text-white py-2 hover:bg-blue-600 active:scale-98">
            Apply Filters
          </button>
          
        </section>

        {/* JOBS */}
        <section id="browseJobs" className="w-full px-6 xl:px-36 py-4 rounded-lg border border-slate-300">
          <div className="w-full flex flex-col justify-center items-center mb-6 gap-3">
              <nav className="hidden md:flex items-center gap-15 text-md font-medium">
                  <Link href="#browseJobs" className="hover:bg-gray-200 px-3 py-2 rounded-full transition-all duration-200">All Jobs</Link>
                  <Link href="#howItWorks" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Cleaning</Link>
                  <Link href="#categories" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Plumbing</Link>
                  <Link href="#providers" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Electical</Link>
                  <Link href="#providers" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Handyman</Link>
                  <Link href="#providers" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Computer Repair</Link>
                  <Link href="#providers" className="hover:bg-gray-200 px-3 py-2 rounded-full  transition-all duration-200">Moving Help</Link>
              </nav>

            <div className="flex justify-between items-center w-full">
              <p className="text-[1.2rem] font-medium">128 jobs found</p>
              <div className="flex items-center ">
                <p className="text-[1.2rem] font-medium">Sort by:</p>
                <select className="border rounded py-1 px-2 ml-2 font-medium">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Other</option>
              </select>
              </div>
              
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div key={job.title} className=" bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1  rounded-lg ">
                  {job.category}
                </span>
                <span></span>
                <div className="flex border-b border-slate-300">
                  <div className="md:h-auto bg-slate-100 mb-4 mt-2 ">
                    <Image
                      src={'/images/helpNear-logo.png'} 
                      alt={job.title} 
                      width={50}
                      height={50}
                      className="md:w-40 md:h-auto object-cover border border-black rounded-xl" 
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold mt-3 md:text-lg">{job.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">📍 {job.location}</p>
                    <p className="text-xs text-slate-500 mt-1"> {job.location}</p>
                    <p className="text-green-600 font-bold mt-3 text-[1.4rem]">${job.price} </p>
                    {/* <p className="text-xs text-slate-400 mt-3">📅 {job.preferred_date ? new Date(job.preferred_date).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : 'Flexible'}</p> */}
                    <p className="text-xs text-slate-400 mt-3"></p>
                  </div>

                  

                </div>
                <div className="flex justify-between mt-2 items-center">
                  <span>⌚ {job.time ?? 'Any time'}</span>
                  <span>5 Quotes</span>
                  <button className="border border-blue-500 text-blue-500 py-1 px-2 rounded-md hover:bg-blue-400 hover:text-white active:scale-98">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <footer>
            <div className="flex justify-center items-center mt-2 gap-10">
              <button className="border border-slate-400 rounded py-1 px-1 font-medium hover:bg-slate-200 active:scale-98">Previous</button>
              <button className="border border-slate-400 rounded py-1 px-2 font-medium hover:bg-slate-200 active:scale-98">Next</button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}