'use client';

import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { API_URL } from '@/api/Api';


export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}cards/searcher?search=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setResults(data);
            setIsOpen(true);
        } catch (err) {
            console.error('Ошибка при поиске:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className='bg-white flex items-center px-[10px] py-[12px] w-full shadow sticky top-0 z-100 max-md:flex-col max-md:p-0 max-md:pb-3'>
                <Link href='/' className='flex items-center justify-center'>
                    <Image src="/images/logo.png" alt="logo" width={110} height={0} className='ml-[140px] max-xl:ml-[40px] max-md:m-0' />
                </Link>
                <form
                    onSubmit={handleSearch}
                    className='flex w-[456px] max-md:w-auto items-center justify-between h-11 rounded-full border border-gray-300  mx-auto'
                >
                    <button className='py-[12px] px-3.5' type="submit">
                        <Image src="/images/search.svg" alt='search' width={24} height={24} />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Поиск ресторанов, мечетей или услуг'
                        className='w-full py-[12px] px-3.5 pl-0 outline-none'
                    />
                    <button
                        type="submit"
                        className='px-4 py-2.5 rounded-r-full bg-[#1A5D1A] text-white font-bold hover:bg-[#155d15] transition duration-300 ease-in-out'
                    >
                        Найти
                    </button>
                </form>
            </header>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed bottom-0 right-0 left-0 top-[80px] bg-[#00000048] max-sm:top-[111px]" />
                    </Transition.Child>

                    <div className="fixed bottom-0 right-0 left-0 top-[80px] overflow-y-auto max-sm:top-[111px]">
                        <div className="flex min-h-full items-center justify-center p-4 text-center max-sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="max-sm:rounded-[0px] w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all">
                                    {loading ? (
                                        <p>Загрузка...</p>
                                    ) : results.length === 0 ? (
                                        <p>Ничего не найдено</p>
                                    ) : (
                                        <ul className="space-y-3">
                                            {results.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/details/${item.id}`}
                                                    className='flex flex-col gap-2 items-start justify-start rounded-[10px]'
                                                >
                                                    <div className='h-[200px] w-full rounded-[10px] overflow-hidden'>
                                                        <Image
                                                            src={item.face_img || '/images/default-card.jpg'}
                                                            alt='card'
                                                            width={200}
                                                            height={100}
                                                            className='rounded-[10px] w-full h-[200px] object-cover hover:scale-105 transition-all duration-300 ease-in-out'
                                                        />
                                                    </div>
                                                    <span className='text-[20px] font-bold lg:text-[16px]'>
                                                        {item.title || 'Нет названия'}
                                                    </span>
                                                    <p className='text-[14px] font-normal text-[#555555]'>
                                                        {item.address || 'Нет адреса'}
                                                    </p>
                                                    <span className='text-[14px] font-normal text-[#555555] bg-[#F3F0F3] px-2 py-1 rounded-[10px]'>
                                                        {item.type || 'Нет тегов'}
                                                    </span>
                                                    <div className='inline-flex items-center gap-2'>
                                                        <span className=' text-[16px] font-normal text-black'>
                                                            {item.average_rating || 'Нет рейтинга'}
                                                        </span>
                                                        {item.average_rating ?
                                                            <Image src='/images/star.svg' alt='star' width={16} height={16} />
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
