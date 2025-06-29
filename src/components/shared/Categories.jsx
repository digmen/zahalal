'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCategories, setSelectedId } from '@/store/features/categoriesSlice';
import Image from 'next/image';

export default function Categories({ selectedCatId }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { list } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSelect = (id) => {
        dispatch(setSelectedId(id));
        router.push(`/?cat=${id}`);
    };

    const goNews = () => {
        dispatch(setSelectedId('news'));
        router.push(`/?cat=news`);
    };

    return (
        <section className='min-w-[260px] hidden lg:block shrink-0 sticky top-6 h-fit'>
            <nav className='my-[50px]'>
                <ul className='flex flex-col gap-4'>
                    {list.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`cursor-pointer w-full p-2.5 px-5 rounded-2xl shadow transition-all duration-300 ease-in-out
                            ${String(selectedCatId) === String(item.id) ? 'bg-green-700 text-white' : 'bg-[#f6f6f6]'}`}
                        >
                            <Image
                                src={item.logo}
                                alt={item.name}
                                width={24}
                                height={24}
                                className='inline-block mr-2 w-[24px] h-[24px]'
                            />
                            {item.name}
                        </li>
                    ))}
                    <li
                        onClick={() => goNews()}
                        className={`cursor-pointer w-full p-2.5 px-5 rounded-2xl shadow transition-all duration-300 ease-in-out
                            ${String(selectedCatId) === 'news' ? 'bg-green-700 text-white' : 'bg-[#f6f6f6]'}`}
                    >
                        Новости
                    </li>
                </ul>
            </nav>
        </section>
    );
}
