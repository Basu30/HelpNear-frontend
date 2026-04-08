import { useEffect, useState } from "react";

const BASE_URL = process.env.NODE_ENV || 'http://localhost:5000/api/v1'


export default function Service_categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${BASE_URL}/service_categories`)
            const responseData = await result.json()
            setCategories(responseData)

            console.log('Service categories data', responseData)
        }
        fetchData()
    },[]);

}