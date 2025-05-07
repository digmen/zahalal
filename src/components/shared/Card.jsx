import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Card() {

    const id = 1 // Replace with actual ID or prop

    return (
        <Link href={`/details/${id}`} className='flex flex-col gap-2 items-start justify-start rounded-[10px]'>
            <div className='h-[200px] w-full rounded-[10px] overflow-hidden'>
                <Image
                    src='/images/card.jpg'
                    alt='card'
                    width={200}
                    height={100}
                    className='rounded-[10px] w-full h-[200px] object-cover hover:scale-105 transition-all duration-300 ease-in-out'
                />
            </div>
            <span className='text-[20px] font-bold lg:text-[16px]'>
                Кафе «Зам Зам»
            </span>
            <p className='text-[14px] font-normal text-[#555555]'>
                Санкт-Петербург, ул. Ленина, 1
            </p>
            <span className='text-[14px] font-normal text-[#555555] bg-[#F3F0F3] px-2 py-1 rounded-[10px]'>
                Халяль, Кафе
            </span>
            <div className='inline-flex items-center gap-2'>
                <span className=' text-[16px] font-normal text-black'>
                    4.5
                </span>
                <Image src='/images/star.svg' alt='star' width={16} height={16} />
            </div>
        </Link>
    )
}
