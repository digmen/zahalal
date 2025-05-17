import Header from '@/components/layout/Header';
import BackButton from '@/components/shared/BackButton';
import YandexMap from '@/components/shared/YandexMap';
import ModalViewAllPhoto from '@/components/shared/ModalViewAllPhoto';
import ShareButton from '@/components/shared/ShareButton';
import Video from '@/components/shared/Video';
import WorkTime from '@/components/shared/WorkTime';
import Image from 'next/image';
import Link from 'next/link';
import Reviews from '@/components/shared/Reviews';

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
            <main className='max-w-[960px] mx-auto my-0 max-lg:max-w-[720px]'>
                <article className="relative w-full max-w-[960px] h-[400px] max-xl:h-[400px] max-lg:h-[350px] lg:mx-4">
                    <BackButton />
                    <Image
                        src={restaurant.imageUrl}
                        alt="bgdetail"
                        width={960}
                        height={400}
                        className="w-full xl:h-[400px] max-xl:h-[400px] max-lg:h-[350px] max-md:m-0 object-cover rounded-none sm:rounded-3xl mt-4"
                    />
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
                    <section className='w-full py-3'>
                        <div className='flex items-center  gap-4 w-full overflow-scroll'>
                            <button className='group cursor-pointer flex flex-1 items-center justify-center backdrop-blur-sm h-10 hover:bg-[#131105] hover:text-white text-[18px] text-black font-normal bg-[#F3F0F3] p-2 px-4 rounded-lg transition-all duration-300 ease-in-out'>
                                <Link href={`tel:+7 (999) 117-05-05`}
                                    className='inline-flex gap-1.5 items-center justify-center'
                                >
                                    <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhoneIcon">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"></path>
                                    </svg>
                                    Позвонить
                                </Link>
                            </button>
                            <button className='group cursor-pointer flex flex-1 items-center justify-center backdrop-blur-sm h-10 hover:bg-[#131105] hover:text-white text-[18px] text-black font-normal bg-[#F3F0F3] p-2 px-4 rounded-lg transition-all duration-300 ease-in-out'>
                                <Link href={`tel:+7 (999) 117-05-05`}
                                    className='inline-flex gap-1.5 items-center justify-center'
                                >
                                    <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PublicIcon">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39"></path>
                                    </svg>
                                    Сайт
                                </Link>
                            </button>
                            <button className='group cursor-pointer flex flex-1 items-center justify-center backdrop-blur-sm h-10 hover:bg-[#131105] hover:text-white text-[18px] text-black font-normal bg-[#F3F0F3] p-2 px-4 rounded-lg transition-all duration-300 ease-in-out'>
                                <Link href={`tel:+7 (999) 117-05-05`}
                                    className='inline-flex gap-1.5 items-center justify-center'
                                >
                                    <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MapIcon">
                                        <path d="m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5M15 19l-6-2.11V5l6 2.11z"></path>
                                    </svg>
                                    Адрес
                                </Link>
                            </button>
                        </div>
                    </section>
                    <section className='py-4'>
                        <h2 className='text-[24px] font-bold text-[#131105]'>Описание</h2>
                        <p className='text-[#656565] text-[16px] font-normal leading-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut erat nec nisi facilisis tincidunt. Donec ac ligula a nunc facilisis bibendum. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquet nunc, eget aliquam nisl nisl eget nunc.</p>
                    </section>
                    <ModalViewAllPhoto />
                    <WorkTime />
                    <Video />
                    <YandexMap />
                    <Reviews />
                </article>
            </main>
        </>
    )
}
