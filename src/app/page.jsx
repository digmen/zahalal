import Card from '@/components/shared/Card'
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
        <section>
          <section className='flex items-center justify-between'>
            <button className='text-[14px] font-bold text-[#131105] flex items-center gap-2 hover:underline'>
              <Image
                src="/images/geotag.svg"
                alt='geotag'
                width={24}
                height={24} />
              Где вы находитесь?
              <Image
                src="/images/arrow-up.svg"
                alt='arrow'
                width={20}
                height={20}
                className='rotate-180'
              />
            </button>
            <button className='text-[14px] font-bold text-[#131105] hover:underline'>
              Где я?
            </button>
          </section>
          <form className='flex w-[456px] items-center justify-between mt-2.5 bg-[#F3F0F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2'>
            <input
              type="text"
              placeholder='Поиск ресторанов, мечетей или услуг'
              className='w-full' />
            <button className='px-4 py-2'>
              <Image
                src="/images/search.svg"
                alt='search'
                width={24}
                height={24} />
            </button>
          </form>
        </section>
      </article>
      <article className='mt-8 flex gap-9 items-start justify-between'>
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
      </article>
    </main>
  )
}
