'use client'
import { useState } from "react"

const Login = () => {

    const [display, setDisplay] = useState()

    return (
        <main className="min-h-screen flex justify-center items-center bg-[#caeaf7f5] border-8 border-white text-black">
            <div id="login"  className="relative w-4/8 h-[600] flex justify-center bg-white rounded-4xl shadow-[0px_2px_8px_4px_rgba(0,0,0,0.2)]">

                {/* LOGIN PAGE */}
                <div className=" w-full flex flex-col justify-center gap-8 items-center">
                    <h1 className="text-center font-bold text-4xl">
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
                            <input type="email" className="rounded bg-gray-300 w-80 p-2" placeholder="Email"/>
                            <input type="password" className="rounded bg-gray-300 p-2" placeholder="Password"/>
                        </div>
                    </div>

                    <p className="cursor-pointer active:scale-97">Forget your password</p>

                    <div className="text-center">
                        <button className="bg-[#0b62c4f5] rounded-md text-white px-10 py-2 hover:bg-blue-500 active:scale-98">Log in</button>
                    </div>
            
                </div>

                {/* REGISTER PAGE */}
                <div className="w-full flex flex-col justify-center gap-8 items-center">
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
                            <input type="text"  className="rounded bg-gray-300 w-80 p-2" placeholder="Full Name"/>
                            <input type="email" className="rounded bg-gray-300 w-80 p-2" placeholder="Email"/>
                            <input type="password" className="rounded bg-gray-300 p-2" placeholder="Password"/>
                        </div>
                    </div>

                    <p className="cursor-pointer active:scale-97">Forget your password</p>

                    <div className="text-center">
                        <button className="bg-[#0b62c4f5] rounded-md text-white px-10 py-2 hover:bg-blue-500 active:scale-98">Register</button>
                    </div>
                </div> 
        
                {/* SLIDING BLUE PANEL THAT ANIMATED*/}
                <div className={`absolute bg-[#0b62c4f5] text-white flex flex-col left-0 top-0 justify-center items-center h-full shadow-[-4px_0px_3px_0px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-transform duration-2000 ease-in-out ${display === "#login" ? "translate-x-full rounded-bl-[6rem] rounded-tl-[12rem] rounded-r-4xl w-1/2" : "translate-x-0 rounded-br-[6rem] rounded-tr-[12rem] rounded-l-4xl w-1/2" }`}>
                    <div>
                        <h1 className="mb-6 text-center font-bold text-4xl">{display === "#login" ? "Hello, Friend!" : "Welcome Back"}</h1>
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