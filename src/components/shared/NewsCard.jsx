import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function NewsCard({ cards }) {

    if (!cards || cards.length === 0) {
        return (
            <div className='w-full h-[200px] flex items-center justify-center'>
                <p className='text-[20px] font-bold text-gray-500'>Нет карточек для отображения</p>
            </div>
        )
    }

    return (
        <section className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
            {cards.map((item) => (
                <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className='flex flex-col gap-2 items-start justify-start rounded-[10px]'
                >
                    <div className='h-[200px] w-full rounded-[10px] overflow-hidden'>
                        <Image
                            src={item.face_image || '/images/default-card.jpg'}
                            alt='card'
                            width={200}
                            height={100}
                            className='rounded-[10px] w-full h-[200px] object-cover hover:scale-105 transition-all duration-300 ease-in-out'
                        />
                    </div>
                    <span className='text-[20px] font-bold lg:text-[16px]'>
                        {item.title || 'Нет заголовка'}
                    </span>
                    <p className='text-[14px] font-normal text-[#555555]'>
                        {(item.description?.slice(0, 70) || 'Нет описания') + '...'}
                    </p>
                </Link>
            ))}
        </section>
    )
}
