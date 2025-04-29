import Card from '@/components/shared/Card'
import Carousel from '@/components/shared/Carousel'
import MainPageSearch from '@/components/shared/MainPageSearch'
import Image from 'next/image'
import React from 'react'

export default function page() {

  return (
    <main className='max-w-[1200px] mx-auto my-0'>
      <article className='flex flex-col gap-6 items-center justify-center'>
        <section className='flex flex-col gap-2 items-center justify-center'>
          <Image src="/images/logo.png" alt="logo" width={150} height={100} />
          <h1 className='text-[#111111] text-[32px] font-bold'>Найдите халяльные рестораны, мечети и сервисы</h1>
          <p className='text-[#555555] text-[18px] font-normal'>Поиск по всей России</p>
        </section>
        <MainPageSearch />
      </article>
      <article className='mt-8 gap-9 flex items-start justify-between'>
        <section className='min-w-[260px] hidden lg:block  shrink-0 sticky top-6 h-fit'>
          <nav className='my-[50px]'>
            <ul className='flex flex-col items-start justify-between gap-4'>
              <li className='text-[16px] text-black font-normal bg-[#f6f6f6] w-full p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>🍽 Еда</li>
              <li className='text-[16px] text-black font-normal bg-[#f6f6f6] w-full p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>🕌 Религия</li>
              <li className='text-[16px] text-black font-normal bg-[#f6f6f6] w-full p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>🛠 Услуги</li>
              <li className='text-[16px] text-black font-normal bg-[#f6f6f6] w-full p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>💼 Работа и бизнес</li>
              <li className='text-[16px] text-black font-normal bg-[#f6f6f6] w-full p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>👨‍👩‍👧‍👦 Семья и дети</li>
            </ul>
          </nav>
        </section>
        <section className='flex flex-col gap-6 w-full my-[50px]'>
          <section>
            <Carousel />
          </section>
          <section className='flex flex-col gap-6 w-full'>
            <div className='flex items-center justify-center gap-4'>
              <button className='text-[18px] text-black font-normal bg-[#f6f6f6] p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>
                Кафе
              </button>
              <button className='text-[18px] text-black font-normal bg-[#f6f6f6] p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>
                Рестораны
              </button>
              <button className='text-[18px] text-black font-normal bg-[#f6f6f6] p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>
                Магазины
              </button>
              <button className='text-[18px] text-black font-normal bg-[#f6f6f6] p-2.5 rounded-2xl active:bg-[#1A5D1A] shadow hover:scale-105 transition-all duration-300 ease-in-out'>
                Фермы
              </button>
            </div>
            <section className='grid grid-cols-3 gap-4'>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </section>
          </section>
        </section>
      </article>
    </main>
  )
}
