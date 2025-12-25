import Header from '@/components/layout/Header';
import BackButton from '@/components/shared/BackButton';
import ModalViewAllPhoto from '@/components/shared/ModalViewAllPhoto';
import ShareButton from '@/components/shared/ShareButton';
import Video from '@/components/shared/Video';
import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '@/api/Api';
import NewsDescription from '@/components/shared/NewsDescription';

const getData = async (id) => {
    try {
        const res = await fetch(`${API_URL}news/${id}/`, {
            cache: 'no-cache'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


export default async function page({ params }) {
    const { id } = await params
    const news = await getData(id);

    if (!news) {
        return <div className='p-4 flex justify-center items-center h-screen'>Ресторан не найден</div>
    }


    return (
        <>
            <Header />
            <main className='max-w-[960px] mx-auto my-0 max-lg:max-w-[720px]'>
                <article className="relative w-full max-w-[960px] h-[400px] max-xl:h-[400px] max-lg:h-[350px] max-sm:h-[300px] lg:mx-4">
                    <BackButton />
                    <Image
                        src={news.face_image}
                        alt="bgdetail"
                        width={960}
                        height={400}
                        className="w-full xl:h-[400px] max-xl:h-[400px] max-lg:h-[350px] max-sm:h-[300px] max-md:m-0 object-cover rounded-none sm:rounded-3xl mt-4"
                    />
                </article>
                <article className='py-7 px-4'>
                    <section>
                        <div className='flex items-center justify-between'>
                            <h1 className="text-[24px] leading-[28px] tracking-[-0.12px] font-bold text-[#131105]">
                                <span className='max-sm:text-[18px] text-2xl font-bold'>{news.title}</span>
                            </h1>
                            <ShareButton />
                        </div>
                        <span className='max-sm:text-[12px] text-sm text-[#656565]'>{news.address}</span>
                    </section>
                    <section className='py-4'>
                        <h2 className='max-sm:text-[18px] text-[24px] font-bold text-[#131105]'>Описание</h2>
                        <NewsDescription description={news.description} />
                    </section>
                    {/* <ModalViewAllPhoto restaurantPhoto={news.photos} /> */}
                    <Video restaurantVideo={news.videos} />
                </article>
            </main>
        </>
    )
}
