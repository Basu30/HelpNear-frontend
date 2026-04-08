'use client'
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import createJob, {type Category, getCategories} from "@/services/jobs.service";


const CreateJob = () => {

    const { token, isLoading } = useAuth();
    const router = useRouter();

    // UI STATE
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [images, setImages] = useState<File[]>([]);

    // FORM STATE
    const [formData, setFormData] = useState({
        category_id:    '',
        title:          '',
        description:    '',
        city:           '',
        district:       '',
        budget_min:     '',
        budget_max:     '',
        preferred_date: '',
        preferred_time: '',
    })

    /**
     * What: fetch categories on page load
     * Why: dropdown needs real UUIDs from DB
     * When: runs once when component mounts
     */
    useEffect(() => {
        if (isLoading) return    // wait for session restore


        getCategories()
        .then(data => setCategories(data.categories))
        .catch(err => console.error(err))
    },[ isLoading ])

    /**
     * What: single handler for all inputs
     * Why: [e.target.name] dynamically updates the right field
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    // HANDLE SUBMIT
    const handleSubmit = async () => {
        setLoading(true)
        setError(null)

        try{
            const res = await createJob({
                ...formData,
                budget_min: formData.budget_min ? Number(formData.budget_min) : undefined,
                budget_max: formData.budget_max ? Number(formData.budget_max) : undefined,
            }, 
                token!
            )
            console.log('create job res', res)

            router.push('/dashboard/customer/c_jobs')
        } catch (err) {
            if (err instanceof Error) setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // IMAGE HANDLER
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        // Limit (optional)
        if (images.length + files.length > 5) {
            alert("Max 5 images allowed");
            return;
        }

        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
 
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center text-black">
            <div className="w-full max-w-4xl h-240 overflow-auto no-scrollbar">
                <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] overflow-hidden">
                    
                    <div className="px-6 md:px-10 pt-4 pb-4 border-b border-slate-200">
                        <p className="text-sm font-medium text-blue-600 mb-2">Job Posting</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Create a New Job
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm md:text-base">
                            Fill in the details below so workers can clearly understand your job.
                        </p>
                    </div>

                    <form className="px-6 md:px-10 py-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Job Title
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Need help cleaning a 2-bedroom apartment"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the work, size, condition, tools needed, and any important details..."
                                    rows={4}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Minimum Budget
                                </label>
                                <input
                                    name="budget_min"
                                    type="number"
                                    value={formData.budget_min}
                                    onChange={handleChange}
                                    placeholder="e.g. 50"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Maximum Budget
                                </label>
                                <input
                                    name="budget_max"
                                    type="number"
                                    value={formData.budget_max}
                                    onChange={handleChange}
                                    placeholder="e.g. 120"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    City
                                </label>
                                <input
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Calgary"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    District
                                </label>
                                <input
                                    name="district"
                                    type="text"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="e.g. Downtown"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preferred Date
                                </label>
                                <input
                                    name="preferred_date"
                                    type="date"
                                    value={formData.preferred_date}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Preferred Time
                                </label>
                                <input
                                    name="preferred_time"
                                    type="time"
                                    value={formData.preferred_time}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-700">
                                Job Images
                            </label>

                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 hover:border-blue-400 transition">
                                
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imageUpload"
                                />

                                <label
                                    htmlFor="imageUpload"
                                    className="flex flex-col items-center justify-center cursor-pointer text-center"
                                >
                                    <div className="text-3xl mb-2">📷</div>
                                    <p className="text-sm text-slate-600">
                                        Click to upload or drag images here
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        PNG, JPG up to 5MB
                                    </p>
                                </label>
                            </div>

                            {/* Preview */}
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-xl overflow-hidden border"
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="preview"
                                            className="w-full h-24 object-cover"
                                        />

                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-50"
                            >
                                {loading ? "Posting..." : "Post Job"}
                            </button>

                            <button
                                type="button"
                                className="w-full sm:w-auto px-8 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
                            >
                                Save Draft
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateJob;