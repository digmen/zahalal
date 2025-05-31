'use client'
import { API_URL } from "@/api/Api";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavTabs() {

    const [navigationData, setNavigationData] = useState([]);

    async function fetchData() {
        try {
            const res = await axios.get(`${API_URL}categories/`);
            setNavigationData(res.data);
        } catch (error) {
            console.error('Error fetching navigation data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleCategoryClick = async (category) => {
        try {
            const res = await axios.get(`${API_URL}products/?category=${category.id}`);
            setProducts(res.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };


    return (
        <section className='min-w-[260px] hidden lg:block shrink-0 sticky top-6 h-fit max-lg:min-w-[230px] max-md:hidden'>
            <nav className='my-[50px]'>
                <ul className='flex flex-col items-start justify-between gap-4 lg:gap-2'>
                    {navigationData.map((item, index) => (
                        <li
                            key={index}
                            className='text-[16px] text-black font-normal cursor-pointer bg-[#f6f6f6] w-full p-2.5 px-5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'
                            onClick={() => handleCategoryClick(item)}
                        >
                            <Image src={item.logo} alt={item.name} width={24} height={24} className='inline-block mr-2' />
                            {item.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
