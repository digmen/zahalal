import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className=' bg-[#0A2C2C] text-white px-[150px] py-[50px] h-auto w-full max-xl:px-[50px] max-md:px-[20px]'>
            <article className='grid grid-cols-3 grid-rows-1 gap-10 items-start md:gap-13 max-md:grid-cols-1'>
                <section className='flex flex-col gap-6'>
                    <h1 className='text-[48px] font-bold md:text-3xl'>ZaHalal</h1>
                    <p>Халяльный гид: рестораны, мечети и услуги по всей России</p>
                    <span className='text-[#cccccc]'>© 2025 - 2025 ZaHalal</span>
                </section>
                <section className='flex flex-col gap-6'>
                    <h2 className='text-[24px] font-bold'>О нас</h2>
                    <Link href="/">О Halalpiter</Link>
                    <Link href="/">Условия использования</Link>
                    <Link href="/">Политика конфиденциальности</Link>
                    <Link href="/">О Связаться с нами</Link>
                </section>
                <section className='flex flex-col gap-6'>
                    <h3 className='text-[24px] font-bold'>Соцсети</h3>
                    <Link href="/">📸 Instagram</Link>
                    <Link href="/">🎵 TikTok</Link>
                </section>
            </article>
        </footer>
    )
}
