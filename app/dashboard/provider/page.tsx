'use client'

import Image from "next/image"
import type { ProviderProfile } from "@/types/providerProfile"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { ownProfile, updateCategories, updateProfile } from "@/services/provider.service"
import { Category, getCategories } from "@/services/jobs.service"


const Badges = [
    { id: '1', badgeName: 'Reliable'},
    { id: '2', badgeName: 'Hard Working'},
    { id: '3', badgeName: 'Detail Oriented'},
    { id: '4', badgeName: 'On-time'},
]

const Skills = [
    { id: 1, name: 'Deep cleaning'},
   
    { id: 2, name: 'Kitchen Cleaning'},
    { id: 3, name: 'Bathroom Sanitization'},
    { id: 4, name: 'Floor Care'},
    { id: 5, name: 'Laundry'},
    { id: 6, name: 'Window Cleaning'},
    { id: 7, name: 'Organization'},

]

const Experience = [
    {id: '1', position: 'Senior Cleaner', company: 'Sparkle Cleaning Services', start: '2021', end: 'present', desc: 'Provide deep cleaning services for homes and offices. Manage client schedules and ensure 100% satisfaction' },
    {id: '2', position: 'Cleaner', company: 'Sparkle Cleaning Services', start: '2010', end: '2021', desc: 'Provide deep cleaning services for homes and offices. Manage client schedules and ensure 100% satisfaction' },
    {id: '3', position: 'Assistant Cleaner', company: 'Sparkle Cleaning Services', start: '2009', end: '2010', desc: 'Provide deep cleaning services for homes and offices. Manage client schedules and ensure 100% satisfaction' },
]

export default function ProviderDashboard(){
    const {user, token, isLoading } = useAuth();

    // PROFILE DATA FROM API
    const [profile, setProfile] = useState<ProviderProfile | null>(null)

    // EDIT MODE TOGGLE
    const [isEditing, setIsEditing] = useState(false)

    // FORM DATA - PRE-FILLED WHEN ENTERING EDIT MODE
    const [formData, setFormData] = useState({
        bio: '',
        experience_years: '',
        city: '',
        district: ''
    });

    // CATEGORIES
    const [categories, setCategories] = useState<Category[]>([])
    const [selectCategories, setSelectCategories] = useState<string[]>([])
    
    // UI
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if(isLoading || !token) return

        Promise.all([
            ownProfile(token),
            getCategories(),
        ])
          .then(([ profileData, categoriesData ]) => {
            setProfile(profileData.profile)
            setCategories(categoriesData.categories)

                // PRE-FILL FORM CURRENT VALUES
            setFormData({
                bio: profileData.profile.bio ?? '',
                experience_years: String(profileData.profile.experience_years ?? ''),
                city: profileData.profile.city ?? '',
                district: profileData.profile.district ?? '',
            })
          })
          
          .catch(err => setError( err.message ))
          .finally(() => setLoading(false))
    }, [isLoading, token]);


    // SAVE HANDLER
    const handleSave = async () => {
        setSaving(true)
        setError(null)
        setSuccess(null)

        try {
            await Promise.all([
                updateProfile({
                    ...formData,
                    experience_years: formData.experience_years ? 
                    Number(formData.experience_years)
                    : undefined,
                }, token!),
                updateCategories(selectCategories, token!),
            ])

            setSuccess('Profile updated successfully')
            setIsEditing(false)

            // REFRESH PROFILE DATA
            const updated = await ownProfile(token!)
            setProfile(updated.profile)

        } catch (err) {
            if (err instanceof Error ) setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-400">Loading profile...</p>
        </div>
    )
    return (
        <main className="h-[100vh] overflow-auto no-scrollbar bg-white text-black text-center">
            <div className="flex flex-col justify-between items-center md:p-4 m-2">
                <div className="flex items-center w-full justify-between">
                    <div className="flex justify-start h-10 p-2 w-1/2 text-black rounded-2xl bg-gray-200 hover:bg-gray-300 active:border-none">
                        <Image
                            src={'/images/search.png'}
                            alt="Search"
                            width={25}
                            height={10}
                            className="active:scale-97 text-white"
                        />
                        <input
                            title="Search" 
                            placeholder="Search..."
                            className="w-full ml-2 border-none outline-none"
                        />
                    </div>
                    
                    <div className="flex md:w-1/2 justify-end items-center">
                        <Image 
                            src={'/images/notification.png'}
                            alt="Picture"
                            width={20}
                            height={20}
                            className="w-10 h-10 p-2 rounded-full mx-4 border-1 bg-gray-200 hover:bg-gray-300 active:scale-97"
                        />
                        <Image 
                            src={'/images/Basu3.JPEG'}
                            alt="Picture"
                            loading="eager"
                            width={20}
                            height={20}
                            className="w-15 h-15 rounded-full mx-4 hover:bg-gray-300 active:scale-97"
                        />
                        {/* <select >
                            <option>select 1</option>
                            <option>select 2</option>
                            <option>select 3</option>
                            <option>select 4</option>
                        </select> */}
                    </div>
                </div>

                {/* PROFILE */}
                <div className="flex items-center md:justify-between justify-evenly md:w-9/10 w-full text-white rounded-2xl bg-blue-500 my-4">
                    <div className="md:grid grid-cols-2 items-center p-2">
                      
                        <Image 
                            src={'/images/Basu3.JPEG'}
                            alt="Picture"
                            loading="eager"
                            width={50}
                            height={50}
                            className="md:flex hidden w-35 h-35 border-white border-4 rounded-full ml-10 my-6"
                        />
                        
                        <div className="text-left space-y-2">
                            <h1 className="md:text-[1.5rem] font-bold ">{user?.full_name}</h1>
                            <p className="text-sm">Senior Cleaner</p>
                            <p className="text-xs">
                                {profile?.city && profile?.district 
                                ? `${profile?.city}, ${profile?.district}` 
                                : profile?.city ?? 'Location not set'}
                            </p>
                            <div className="flex space-x-2">
                                <div className="flex bg-blue-400 rounded-xl px-0.5 py-0.5 text-xs gap-1 items-center">
                              
                                    <Image
                                        src={'/images/star.png'}
                                        alt="Job Completed"
                                        width={20} 
                                        height={20}
                                        className="md:w-1/8 h-auto ml-1"
                                    /> 
                                    {profile?.average_rating} - ({profile?.total_reviews} reviews)
                               
                                </div>
                                <span className="flex items-center bg-blue-400 rounded-xl px-2 text-xs gap-1">
                                    <Image
                                        src={'/images/protect.png'}
                                        alt="Job Completed"
                                        width={50}
                                        height={50}
                                        className="w-1/2 h-auto"
                                    />
                                   {profile?.is_verified === true ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button onClick={() => setIsEditing(true)} className="bg-blue-600 md:text-[1.1rem] text-sm border-1 border-blue-700 rounded-xl md:py-1 md:px-6 px-2 md:mr-10 hover:bg-blue-700 active:scale-98 cursor-pointer shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]">
                        ✏️ Edit profile
                    </button>
                </div>

                {success && (
                    <p className="text-green-600 text-sm text-center mt-2">{success}</p>
                )}

                {error && (
                    <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
            
                <div className="md:flex flex-row justify-center md:w-9/10 gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col justify-center items-center border-1 border-gray-200 rounded-2xl h-auto p-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                            <h1 className="font-bold w-full text-left mb-2">About me</h1>                            
                                
                            {!isEditing ? (
                                <p className="text-left">{profile?.bio ?? 'No bio yet'}</p>
                                ) : (
                                <div className="w-full flex flex-col gap-3">
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        placeholder="Tell customers about yourself..."
                                        rows={4}
                                        className="w-full rounded-xl border p-3 text-black"
                                    />
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        placeholder="City"
                                        className="rounded-xl border p-3 text-black"
                                    />
                                    <input
                                        name="district"
                                        value={formData.district}
                                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                                        placeholder="District"
                                        className="rounded-xl border p-3 text-black"
                                    />
                                    <input
                                        name="experience_years"
                                        type="number"
                                        value={formData.experience_years}
                                        onChange={(e) => setFormData({...formData, experience_years: e.target.value})}
                                        placeholder="Years of experience"
                                        className="rounded-xl border p-3 text-black"
                                    />
                                    {/* Category selector */}
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setSelectCategories(prev =>
                                                    prev.includes(cat.id)
                                                    ? prev.filter(id => id !== cat.id)
                                                    : [...prev, cat.id]
                                                )}
                                                className={`px-4 py-2 rounded-xl border text-sm ${
                                                    selectCategories.includes(cat.id)
                                                    ? 'bg-blue-500 text-white border-blue-500'
                                                    : 'bg-white text-gray-700 border-gray-300'
                                                }`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Save + Cancel */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50"
                                        >
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 border rounded-xl hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                           
                            <div className="flex gap-4 mt-3 w-full">
                                {Badges.map((b, i) => (
                                    <p key={i} className="text-sm font-bolder">
                                        <span className="px-4 py-0.5 bg-gray-200 rounded-xl">{b.badgeName}</span>
                                    </p>
                                    
                                ))}
                               
                            </div>
                        </div> 
                        <div className="flex flex-col justify-center items-center border-1 border-gray-200 rounded-2xl p-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                            <h1 className="font-bold w-full text-left mb-2">Skills</h1>
                            <div className="grid grid-cols-4 justify-start w-full">
                                {Skills.map((s, i) => (
                                    <div key={i} className="w-max">
                                        <p className=" bg-gray-200 rounded-2xl px-2 m-1">
                                            {s.name}
                                        </p>
                                    </div>
                                
                                ))}
                            </div>
                           
                            
                        </div> 
                        <div className="flex flex-col justify-center items-center border-1 border-gray-200 rounded-2xl p-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                            <h1 className="font-bold w-full text-left mb-6">Work Experience</h1>
                            <div className="flex flex-col gap-4 justify-start w-full px-4">
                                {Experience.map((e, i) => (  
                                    <div key={i} className="flex gap-4 border-b-1 border-gray-300 ">
                                        <div  className="bg-blue-200 rounded-xl h-max p-2">
                                            <Image
                                                src={'/images/experience.png'}
                                                alt="Job Completed"
                                                width={50}
                                                height={50}
                                                className="w-auto h-auto"
                                            />
                                        </div>
                              
                                        <p className="flex flex-col text-left text-gray-500 -space-y-1 mb-2">
                                            <span className="text-black font-bold text-[1.1rem]">{e.position}</span>
                                            <span>{e.company}</span>
                                            <span>{e.start} - {e.end}</span>
                                            <span>{e.desc}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>  
                        </div>
                    </div>

                    <div className="flex flex-col md:w-1/3 gap-3">
                        <div className="flex flex-col justify-center items-center border-1 border-gray-200 rounded-2xl gap-2 p-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                            <h1 className="font-bold">Profile Stats</h1>
                            <div className="grid grid-cols-3 items-center">
                                <span className="flex flex-col items-center text-xs space-y-2">
                                    <span className="relativ flex justify-center items-center  bg-green-100 rounded-full w-10 h-10 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                                        <Image
                                            src={'/images/comp.png'}
                                            alt="Job Completed"
                                            width={50}
                                            height={50}
                                            className="w-1/2 h-auto"
                                        />
                                    </span>
                                    
                                    <span className="font-bold text-xl"> {profile?.completed_jobs} </span> 
                                    Jobs Completed
                                </span>

                                <span className="flex flex-col items-center text-xs space-y-2">
                                    <span className="relative flex justify-center items-center bg-yellow-100 rounded-full w-10 h-10 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                                        <Image
                                            src={'/images/star.png'}
                                            alt="Rating"
                                            width={50}
                                            height={50}
                                            className="absolute w-1/2 h-auto"
                                        />
                                    </span>
                                    
                                    <span className="font-bold text-xl"> {profile?.average_rating} </span> 
                                    Rating
                                </span>
                                <span className="flex flex-col items-center text-xs  space-y-2">
                                    <span className="relative flex justify-center items-center bg-blue-100 rounded-full w-10 h-10 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)]">
                                        <Image
                                            src={'/images/good.png'}
                                            alt="Success job "
                                            width={50}
                                            height={50}
                                            className="absolute w-2/3 h-auto"
                                        />
                                    </span>
                                    
                                    <span className="font-bold text-xl"> 98% </span> 
                                    Job Success
                                </span>
                            </div>
                           
                        </div> 
                        <div className="flex justify-center items-center border-1 rounded-xl ">Availability</div> 
                        <div className="flex justify-center items-center border-1 rounded-xl ">Quick Actions</div> 
                        <div className="flex justify-center items-center border-1 rounded-xl ">Account Settings</div> 
                    </div>    

                </div>

               
                
                {/* <footer className="flex items-center justify-between border-1 rounded-xl mt-2 md:px-10 px-2 h-20">
                    <div>
                        <h1 className="font-bold md:text-xl text-sm">Need Help? We're here for you.</h1>
                    <p className="text-[0.9rem] text-black/50 italic">Visit our help center or contact our support team</p>
                    </div>
                    
                    <button className="flex rounded-md md:px-4 py-1 font-bolder text-white bg-blue-500 hover:bg-blue-700 active:scale-98 truncate">Contact Support</button>
                </footer> */}

            </div>
            
           
        </main>
    )
}