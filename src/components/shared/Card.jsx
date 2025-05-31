import { API_URL } from '@/api/Api';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// async function getData() {
//     try {
//         const res = await axios.get(`${API_URL}cards/?cat_id=1`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         console.log(res.data);

//         return res.data.results;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

export default async function Card({ cards }) {
    // const data = await getData();

    return (
        <>
            {cards.map((item) => (
                <Link
                    key={item.id}
                    href={`/ details / ${item.id} `}
                    className='flex flex-col gap-2 items-start justify-start rounded-[10px]'
                >
                    <div className='h-[200px] w-full rounded-[10px] overflow-hidden'>
                        <Image
                            src={item.face_img || '/images/default-card.jpg'}
                            alt='card'
                            width={200}
                            height={100}
                            className='rounded-[10px] w-full h-[200px] object-cover hover:scale-105 transition-all duration-300 ease-in-out'
                        />
                    </div>
                    <span className='text-[20px] font-bold lg:text-[16px]'>
                        {item.title || 'Нет названия'}
                    </span>
                    <p className='text-[14px] font-normal text-[#555555]'>
                        {item.address || 'Нет адреса'}
                    </p>
                    <span className='text-[14px] font-normal text-[#555555] bg-[#F3F0F3] px-2 py-1 rounded-[10px]'>
                        {item.tags?.join(', ') || 'Нет тегов'}
                    </span>
                    <div className='inline-flex items-center gap-2'>
                        <span className=' text-[16px] font-normal text-black'>
                            {item.rating || 'Нет рейтинга'}
                        </span>
                        {item.rating ?
                            <Image src='/images/star.svg' alt='star' width={16} height={16} />
                            :
                            ''
                        }
                    </div>
                </Link>
            ))}
        </>
    )
}
