import { API_URL } from '@/api/Api'
import Card from '@/components/shared/Card'
import Carousel from '@/components/shared/Carousel'
import Categories from '@/components/shared/Categories'
import MainPageSearch from '@/components/shared/MainPageSearch'
import Image from 'next/image'

export default async function page({ searchParams }) {

  const selectedId = searchParams?.cat || null;

  const res = await fetch(`${API_URL}cards/?cat_id=${selectedId ?? ''}`, {
    cache: 'force-cache',
  });

  const data = await res.json();
  const cards = data.results;


  return (
    <main className='max-w-[1200px] mx-auto my-0 max-xl:max-w-[960px] '>
      <article className='flex flex-col gap-6 items-center justify-center'>
        <section className='flex flex-col gap-2 items-center justify-center'>
          <Image src="/images/logo.png" alt="logo" width={150} height={100} />
          <h1 className='text-[#111111] text-[32px] font-bold max-lg:text-[24px] max-md:text-[18px] text-center'>Найдите халяльные рестораны, мечети и сервисы</h1>
          <p className='text-[#555555] text-[18px] font-normal'>Поиск по всей России</p>
        </section>
        <MainPageSearch />
      </article>
      <article className='mt-8 gap-9 flex items-start justify-between lg:gap-4 max-lg:px-6 max-sm:px-1'>
        <Categories />
        <section className='flex flex-col gap-6 w-full my-[50px]'>
          <section>
            <Carousel />
          </section>
          <section className='flex flex-col gap-6 w-full'>
            <div className='flex items-center md:justify-center gap-4 max-md:overflow-scroll max-md:py-3'>
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
            <section className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1'>
              <Card cards={cards} />
            </section>
          </section>
        </section>
      </article>
    </main>
  )
}
