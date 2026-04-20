'use client'

import Image from "next/image";
import { useState } from "react";

export default function ProviderQuote() {
    const [navDisplay, setNavDisplay] = useState<"allQuotes" | "Pending" | "Accepted" | "Withdrawn">("allQuotes");

    const tabClass = (tab: "allQuotes" | "Pending" | "Accepted" | "Withdrawn") =>
        `flex-1 text-center font-bold cursor-pointer py-3 active:scale-98 transition-all ${
            navDisplay === tab
                ? "italic border-b-3 border-blue-600 text-blue-600"
                : "text-black"
        }`;

    return (
        <main className="min-h-screen text-black p-24 border-2">
            <h1 className="md:text-[2rem] font-bold">My Quotes</h1>

            <div className="md:p-6 ">
                <nav className="w-full">
                    <ul className="flex border-b border-gray-300">
                        <li onClick={() => setNavDisplay("allQuotes")} className={tabClass("allQuotes")}>
                            All Quotes 
                            <span className="ml-2 py-0.5 px-1 rounded-full bg-blue-300 text-center">43</span>
                        </li>
                        <li onClick={() => setNavDisplay("Pending")} className={tabClass("Pending")}>
                            Pending
                            <span className="ml-2 py-0.5 px-1 rounded-full bg-yellow-300 text-yellow-700 text-center">43</span>
                        </li>
                        <li onClick={() => setNavDisplay("Accepted")} className={tabClass("Accepted")}>
                            Accepted
                            <span className="ml-2 py-0.5 px-1 rounded-full bg-green-200 text-green-700 text-center">43</span>
                        </li>
                        <li onClick={() => setNavDisplay("Withdrawn")} className={tabClass("Withdrawn")}>
                            Withdrawn
                            <span className="ml-2 py-0.5 px-1 rounded-full bg-gray-300 text-gray-700 text-center">43</span>
                        </li>
                    </ul>
                </nav>

                <div className="w-full mt-6">
                    <div className="bg-[#c7d0ff] border border-gray-300 rounded-lg md:p-2 md:px-4 mb-4 w-max">
                        ⓘ There are all quotes you have submitted to customers.
                    </div>

                    {navDisplay === "allQuotes" && (
                        <div className="flex justify-between items-center justify-center border border-gray-300 rounded-xl md:p-4 p-2 md:gap-4 mt-4 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="flex w-full gap-3">
                                <Image
                                    src="/images/t.jpg"
                                    alt="Photo"
                                    width={50}
                                    height={50}
                                    className="object-cover w-25 h-30 rounded-xl"
                                />
                                <div className="flex flex-col justify-evenly text-[1rem]">
                                    <div className="grid grid-rows-2">
                                        <span className="font-bold md:text-[1.2rem]">House Deep Cleaning</span>
                                        <span className="text-sm text-gray-600">Calgary, AB</span>
                                    </div>
                                    <div className="grid grid-rows-2">
                                        <span className="italic text-"><strong >Customer:</strong> Sarah Johnson</span>
                                        <span className="italic"><strong>Quoted on:</strong> April 20, 2026</span>
                                    </div>
                                   
                                </div>
                            </div>

                            {/* QUOTED */}
                            <div className="flex flex-col w-full items-center font-semibold">
                                <span className=" text-[1.9rem]">$120</span> 
                                <span className="text-gray-400 italic text-[1.2rem]">Your Quote</span>
                            </div>

                            {/* Status + action */}
                            <div className="flex flex-col border-l-1 border-gray-300 w-1/2 items-center">
                                <span className="inline-block bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium whitespace-nowrap">Pending</span>
                                <span className="font-medium">Expires in</span>
                                <span> 23h 45m</span>
                                <button className="text-red-500 mt-2 font-bold border border-gray-200 rounded-md md:px-3 px-1 py-1 md:w-1/2 shadow-sm hover:bg-gray-200 active:scale-98">
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    )}

                    {navDisplay === "Pending" && <div>Pending</div>}
                    {navDisplay === "Accepted" && <div>Accepted</div>}
                    {navDisplay === "Withdrawn" && <div>Withdrawn</div>}
                </div>
            </div>
        </main>
    );
}