import Header from '@/components/layout/Header';
import Image from 'next/image';
import React from 'react'

export default async function page({ params }) {
    const { id } = await params;
    return (
        <>
            <Header />
            <main className='max-w-[1200px] mx-auto my-0'>
                <article>
                    <Image src='/images/bgdetai.png' alt='bgdetai' width={1000} height={500} className='object-cover max-w-[960px] mx-auto rounded-none sm:rounded-3xl mt-4' />
                    <div>
                        Назад
                    </div>
                </article>
            </main>
        </>
    )
}