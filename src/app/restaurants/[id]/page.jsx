import Header from '@/components/layout/Header';
import BackButton from '@/components/shared/BackButton';
import ShareButton from '@/components/shared/ShareButton';
import Image from 'next/image';

const data = [
    {
        id: 1,
        name: 'Ресторан 1',
        address: 'Адрес 1',
        rating: 4.5,
        imageUrl: '/images/bgdetai.png',
    },
    {
        id: 2,
        name: 'Ресторан 2',
        address: 'Адрес 2',
        rating: 4.0,
        imageUrl: '/images/bgdetai.png',
    },
];


export default async function page({ params }) {
    const { id } = await params
    const restaurant = data.find(item => item.id === parseInt(id))

    if (!restaurant) {
        return <div className='p-4'>Ресторан не найден</div>
    }

    return (
        <>
            <Header />
            <main className='max-w-[960px] mx-auto my-0'>
                <article className="relative h-[400px]">
                    <BackButton />
                    <Image src={restaurant.imageUrl} alt='bgdetai' width={960} height={400} className='absolute inset-0 object-cover max-w-[960px] h-full mx-auto rounded-none sm:rounded-3xl mt-4' />
                </article>
                <article className='py-7 px-4'>
                    <section>
                        <div className='flex items-center justify-between'>
                            <h1 className="text-[24px] leading-[28px] tracking-[-0.12px] font-bold text-[#131105]">
                                <span className='text-2xl font-bold'>{restaurant.name}</span>
                            </h1>
                            <ShareButton />
                        </div>
                        <span className='text-sm text-[#656565]'>{restaurant.address}</span>
                    </section>
                    <section>
                        <div className='inline-flex items-center gap-2 '>
                            <span className='text-[16px] font-normal text-black leading-6'>
                                {restaurant.rating}
                            </span>
                            <Image src='/images/star.svg' alt='star' width={16} height={16} />
                        </div>
                    </section>
                </article>
            </main>
        </>
    )
}
