'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchTypes, setSelectedId } from '@/store/features/typesSlice';

export default function Type({ typeData, selectedIdCategories, selectedTypeId }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const typeFromUrl = searchParams.get('type');

    useEffect(() => {
        if (selectedIdCategories) {
            dispatch(fetchTypes(selectedIdCategories));
        }
    }, [dispatch, selectedIdCategories]);

    useEffect(() => {
        if (typeFromUrl !== null) {
            dispatch(setSelectedId(Number(typeFromUrl)));
        } else {
            dispatch(setSelectedId(null));
        }
    }, [dispatch, typeFromUrl]);

    const handleSelect = (id) => {
        dispatch(setSelectedId(id));
        const url = id
            ? `/?cat=${selectedIdCategories}&type=${id}`
            : `/?cat=${selectedIdCategories}`;
        router.push(url);
    };

    if (!typeData || typeData.length === 0) {
        return null;
    }

    return (
        <div className='flex items-center md:justify-center gap-4 max-md:overflow-scroll max-md:py-0'>
            <button
                onClick={() => handleSelect(null)}
                className={`text-[18px] font-normal p-2.5 rounded-xl cursor-pointer max-sm:p-2 max-sm:rounded-lg max-sm:text-[14px]
                    ${selectedTypeId === null ? 'bg-green-700 text-white' : 'bg-[#F3F0F3]'}`}>
                Все
            </button>
            {typeData.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleSelect(item.id)}
                    className={`text-[18px] font-normal p-2.5 rounded-xl cursor-pointer max-sm:p-2 max-sm:rounded-lg max-sm:text-[14px]
                        ${String(selectedTypeId) === String(item.id) ? 'bg-green-700 text-white' : 'bg-[#F3F0F3]'}`}>
                    {item.type}
                </button>
            ))}
        </div>
    );
}
