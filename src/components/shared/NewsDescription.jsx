'use client';

import React, { useState } from 'react';

export default function NewsDescription({ description }) {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 100;

    const toggleDescription = () => setExpanded(prev => !prev);

    const shouldTruncate = description.length > maxLength;
    const displayText = expanded || !shouldTruncate
        ? description
        : description.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';

    return (
        <div className='text-[#656565] text-[16px] font-normal leading-6 max-sm:text-[14px]'>
            <p>{displayText}</p>
            {shouldTruncate && (
                <button
                    onClick={toggleDescription}
                    className='text-blue-500 hover:underline mt-2'
                >
                    {expanded ? 'Скрыть' : 'Показать ещё'}
                </button>
            )}
        </div>
    );
}
