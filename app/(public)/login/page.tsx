'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/auth.service";
import { useAuth } from "@/lib/auth-context";

const Login = () => {
    const { login } = useAuth();

    const router = useRouter();
    const [display, setDisplay] = useState<"#login" | "#register">("#login")

    // LOGIN STATE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    // REGISTER STATE
    const [fullName, setFullName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [role, setRole] = useState<'customer' | 'provider'>('customer')

    // UI STATE
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    // LOGIN
    const handleLogin = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await loginUser(email, password)

            // Store access token
            login(result.accessToken, result.user)

            // Redirect based on role
            if (result.user.role === 'customer') {
                router.push('/dashboard/customer')
            } else if (result.user.role === 'provider') {
                router.push('/dashboard/provider')
            } else if ( result.user.role === 'admin') {
                router.push('/dashboard/admin')
            }

        } catch (err) {

            if (err instanceof Error){
                setError(err.message)
            }
          
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        setLoading(true)
        setError(null)


        try {
            // What: passing one object - matches RegisterInput type in service
            // Why: registerUser expects { full_name, email, password, role }
            await registerUser({
                full_name: fullName, 
                email: regEmail, 
                password: regPassword, 
                role: role 
            })

            setDisplay('#login')
            setError(null)

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } 
           
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <main className="min-h-screen flex justify-center items-center bg-[#caeaf7f5] border-8 border-white text-black">
            <div id="login"  className={`relative md:w-4/8 h-[600px] flex ${display === "#login" ? "justify-between" : "justify-end"} bg-white rounded-4xl shadow-[0px_2px_8px_4px_rgba(0,0,0,0.2)]`}>

                {/* LOGIN PAGE */}
                <div className={`flex flex-col gap-8 " ${display === "#login" ? "flex w-1/2 justify-center items-center" : "hidden"}`}>
                    <h1 className="text-center font-bold md:text-4xl">
                        Log in
                    </h1>
                    <div className="">
                        <div className="flex justify-center gap-4">
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">G+</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">F</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">G</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">In</div>
                        </div>
                        <p className="text-center mb-2 mt-4">or use your email password</p>
                        <div className="grid grid-rows-2 justify-center gap-3">
                            <input
                                type="email" 
                                value={email}
                                className="rounded bg-gray-300 md:w-80 p-2" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                value={password}
                                className="rounded bg-gray-300 p-2" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <p className="cursor-pointer active:scale-97">Forget your password</p>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="bg-[#0b62c4f5] rounded-md text-white px-10 py-2 hover:bg-blue-500 active:scale-98"
                            onClick={handleLogin}
                            disabled={loading}
                            >
                                {loading ? "Logging..." : "Log in"}
                        </button>
                    </div>
            
                </div>

                {/* REGISTER PAGE */}
                <div className={` flex flex-col " ${display === "#register" ? "flex w-1/2 justify-evenly items-center" : "hidden"}`}>
                    <h1 className="text-center font-bold text-4xl">
                        Create Account
                    </h1>
                    <div className="">
                        <div className="flex justify-center gap-4">
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">G+</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">F</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">G</div>
                            <div className="cursor-pointer hover:bg-gray-200 active:scale-98 border-1 w-1/7 text-center rounded ">In</div>
                        </div>
                        <p className="text-center mb-2 mt-4">or use your email for registration</p>

                        <div className="grid grid-rows-2 justify-center gap-3">
                            <input 
                                type="text"  
                                value={fullName}
                                className="rounded bg-gray-300 w-80 p-2" 
                                placeholder="Full Name"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input 
                                type="email" 
                                value={regEmail}
                                className="rounded bg-gray-300 w-80 p-2" 
                                placeholder="Email"
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                value={regPassword}
                                className="rounded bg-gray-300 p-2" 
                                placeholder="Password"
                                onChange={(e) => setRegPassword(e.target.value)}
                            />
                            {/* ROLE SELECTOR */}
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'customer' | 'provider')}>
                                <option value='customer'>Customer</option>
                                <option value='provider'>Provider</option>
                            </select>
                            <div className="active:scale-97">
                                <span className="cursor-pointer hover:text-red-400 ">Forget your password</span>
                            </div>
                        </div>
                    </div>

                     {/* ERROR MESSAGE */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="bg-[#0b62c4f5] rounded-md text-white px-10 py-2 hover:bg-blue-500 active:scale-98"
                            onClick={handleRegister}
                        >
                            {loading ? 'Registering' : 'Register'}
                        </button>
                    </div>
                </div> 
        
                {/* SLIDING BLUE PANEL THAT ANIMATED*/}
                <div className={`absolute bg-[#0b62c4f5] text-white flex flex-col left-0 top-0 justify-center items-center h-full shadow-[-4px_0px_3px_0px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-transform duration-2000 ease-in-out ${display === "#login" ? "translate-x-full rounded-bl-[6rem] rounded-tl-[12rem] rounded-r-4xl w-1/2" : "translate-x-0 rounded-br-[6rem] rounded-tr-[12rem] rounded-l-4xl w-1/2" }`}>
                    <div>
                        <h1 className="mb-6 text-center font-bold md:text-4xl">{display === "#login" ? "Hello, Friend!" : "Welcome Back"}</h1>
                        <p className="italic text-lg">
                            {display === "#login" ? "Register with your personal details to use all of site features" : "Enter your personal details to use all of site features"}</p>
                    </div>
                    <div className="mt-10">
                        <button  onClick={() => setDisplay(display === "#login" ? "#register" : "#login")} className="border-1 rounded-md px-10 py-2 font-bolder hover:bg-blue-500 active:scale-98">{display === "#login" ? "Register" : "Login"}</button>
                    </div>
                    
                </div>
            </div>
        </main>
    )
}
export default Login