'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCategories, setSelectedId } from '@/store/features/categoriesSlice';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BurgerMenu({ selectedCatId }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { list } = useSelector((state) => state.categories);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSelect = (id) => {
        dispatch(setSelectedId(id));
        router.push(`/?cat=${id}`);
        setIsOpen(false);
    };

    return (
        <div className="lg:hidden relative z-50">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Полупрозрачный фон */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Сайдбар */}
                        <motion.div
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white shadow-lg z-50 p-5"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Категории</h2>
                                <button onClick={() => setIsOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-4">
                                {list.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleSelect(item.id)}
                                        className={`cursor-pointer flex items-center gap-3 p-2.5 px-4 rounded-xl transition
                                        ${String(selectedCatId) === String(item.id) ? 'bg-green-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            width={24}
                                            height={24}
                                            className="w-[24px] h-[24px]"
                                        />
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
