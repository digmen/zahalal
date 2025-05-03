import Header from '@/components/layout/Header';
import ShareButton from '@/components/shared/ShareButton';
import Image from 'next/image';
import Link from 'next/link';

export default async function page({ params }) {
    const { id } = await params;
    return (
        <>
            <Header />
            <main className='max-w-[960px] mx-auto my-0'>
                <article className="relative h-[400px]">
                    <div className='px-4 pt-4 absolute top-4 left-0 right-0 z-10 '>
                        <Link href='/' className='group inline-flex items-center gap-2 justify-center h-10 px-3 sm:px-4 py-2 bg-gray-50 backdrop-blur-sm rounded-lg hover:bg-[#131105] hover:text-white transition-colors'>
                            <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" viewBox="0 0 24 24">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
                            </svg>
                            <span className="leading-5 tracking-tight text-sm font-medium hidden sm:inline transition-colors group-hover:text-white">Назад</span>
                        </Link>
                    </div>
                    <Image src='/images/bgdetai.png' alt='bgdetai' width={960} height={400} className='absolute inset-0 object-cover max-w-[960px] h-full mx-auto rounded-none sm:rounded-3xl mt-4' />
                </article>
                <article className='py-7 px-4'>
                    <section>
                        <div className='flex items-center justify-between'>
                            <h1 className="text-[24px] leading-[28px] tracking-[-0.12px] font-bold text-[#131105]">
                                <span className='text-2xl font-bold'>Название ресторана</span>
                            </h1>
                            <ShareButton />
                        </div>
                        <span className='text-sm text-[#656565]'>Адрес 22-83 East 65th Street, Brooklyn, NY</span>
                    </section>
                    <section>
                        <div className='inline-flex items-center gap-2 '>
                            <span className='text-[16px] font-normal text-black leading-6'>
                                4.5
                            </span>
                            <Image src='/images/star.svg' alt='star' width={16} height={16} />
                        </div>
                    </section>
                </article>
            </main>
        </>
    )
}