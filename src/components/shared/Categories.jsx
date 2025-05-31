// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import { API_URL } from "@/api/Api";

// async function getData() {
//     try {
//         const res = await axios.get(`${API_URL}categories/`);
//         return res.data;
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return [];
//     }
// }

// export default function Categories() {
//     const [navigationData, setNavigationData] = useState([]);
//     const [selectedId, setSelectedId] = useState(1);

//     useEffect(() => {
//         getData().then(data => {
//             setNavigationData(data);
//             if (data.length > 0) setSelectedId(data[0].id);
//         });
//     }, []);

//     return (
//         <section className='min-w-[260px] hidden lg:block shrink-0 sticky top-6 h-fit'>
//             <nav className='my-[50px]'>
//                 <ul className='flex flex-col gap-4'>
//                     {navigationData.map((item) => (
//                         <li
//                             key={item.id}
//                             onClick={() => setSelectedId(item.id)}
//                             className={`cursor-pointer w-full p-2.5 px-5 rounded-2xl shadow transition-all duration-300 ease-in-out
//                             ${selectedId === item.id ? 'bg-green-700 text-white' : 'bg-[#f6f6f6]'}`}
//                         >
//                             <Image src={item.logo} alt={item.name} width={24} height={24} className='inline-block mr-2' />
//                             {item.name}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </section>
//     );
// }


'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCategories, setSelectedId } from '@/store/features/categoriesSlice';
import Image from 'next/image';

export default function Categories() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { list, selectedId } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSelect = (id) => {
        dispatch(setSelectedId(id));
        router.push(`/?cat=${id}`); // перезаписываем URL
    };

    return (
        <section className='min-w-[260px] hidden lg:block shrink-0 sticky top-6 h-fit'>
            <nav className='my-[50px]'>
                <ul className='flex flex-col gap-4'>
                    {list.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`cursor-pointer w-full p-2.5 px-5 rounded-2xl shadow transition-all duration-300 ease-in-out
              ${selectedId === item.id ? 'bg-green-700 text-white' : 'bg-[#f6f6f6]'}`}
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
