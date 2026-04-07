'use client'
import Image from "next/image";
import SideBar from "./sidebar";

export default function CustomerDashboard(){
    
    return (
        <main className="min-h-screen flex bg-white text-black ">
            <SideBar/>
            <div className="flex flex-col justify-between w-full p-4">
                <div className="flex items-center w-full mb-8 ">

                    <div className="flex flex-col w-full ml-4 -space-y-2">
                        <h1 className="font-bold  text-black text-[2.5rem]">Hello dear, Customer! 👋</h1>    
                        <p className="text-[1.2rem] italic text-gray-500">Welcome to your dashboard.</p>
                    </div>

                    <div className=" flex justify-start h-10 p-2 w-1/2 text-black rounded-xl bg-gray-200 hover:bg-gray-300 active:border-none">
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
                    
                    <div className="flex w-1/2 justify-end items-center">
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
             

                <div className="grid grid-cols-3 items-center w-full gap-8">
                    <div className="flex justify-center items-center border-1 rounded-xl h-30">3 Jobs posted</div> 
                    <div className="flex justify-center items-center border-1 rounded-xl h-30">2 Quotes reveived</div> 
                    <div className="flex justify-center items-center border-1 rounded-xl h-30">1 Booking active</div> 
                    {/* <div className="flex justify-center items-center border-1 rounded-xl h-30">1 Booking active</div>  */}
                </div>
                
                <div className="grid grid-cols-2 items-center w-full gap-10">
                    <div className="flex justify-center items-center border-1 rounded-xl h-60"></div> 
                    <div className="flex justify-center items-center border-1 rounded-xl h-60"></div> 
                </div>   

                <div className="grid grid-cols-4 items-center w-full gap-8">
                    <div className="flex justify-center items-center border-1 rounded-xl  h-80">Top Categories</div> 
                    <div className="flex justify-center items-center border-1 rounded-xl w-100 h-80">Rewards Progress</div> 
                    <div className="flex justify-center items-center border-1 rounded-xl h-80">Quick Actions</div> 
                    <div className="flex justify-center items-center border-1 rounded-xl h-80">1 Booking active</div> 
                </div>    
                
                <footer className="flex items-center justify-between border-1 rounded-xl mt-2 px-10 h-20">
                    <div>
                        <h1 className="font-bold text-xl">Need Help? We're here for you.</h1>
                    <p className="text-[0.9rem] text-black/50 italic">Visit our help center or contact our support team</p>
                    </div>
                    
                    <button className="flex rounded-md px-4 py-1 font-bolder text-white bg-blue-500 hover:bg-blue-700 active:scale-98">Contact Support</button>
                </footer>

            </div>
            
        </main>
    )
}