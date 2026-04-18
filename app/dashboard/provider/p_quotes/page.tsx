'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { getProviderQuotes } from "@/services/quotes.service";


const ProviderQuote = () => {
    return (
        <main className="text-black flex">
            <h1>Provider Quote</h1>
        </main>
    )
}

export default ProviderQuote;