import React from 'react';

function formatTimeToAMPM(time24) {
    if (!time24) return '—';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

const daysMap = {
    Monday: 'Понедельник',
    Tuesday: 'Вторник',
    Wednesday: 'Среда',
    Thursday: 'Четверг',
    Friday: 'Пятница',
    Saturday: 'Суббота',
    Sunday: 'Воскресенье',
};

export default function WorkTime({ restaurantWorkDay }) {
    const todayIndex = (new Date().getDay() + 6) % 7;

    return (
        <section className="mt-4">

            {!restaurantWorkDay || restaurantWorkDay.length === 0 ? (
                <></>
            ) : (
                <>

                    <span className="max-sm:text-[18px] text-lg font-semibold">Часы работы</span>
                    <ul className="flex flex-col mt-4 rounded-2xl border border-gray-200 overflow-hidden">
                        {restaurantWorkDay.map((item, idx) => {
                            const isToday = idx === todayIndex;
                            return (
                                <li
                                    key={idx}
                                    className={`flex justify-between items-center border-b border-gray-200 py-3 px-4 font-normal even:bg-[#F3F0F3] ${isToday ? 'bg-[#F2FBF8] font-semibold text-black' : ''
                                        }`}
                                >
                                    <span className='max-sm:text-[12px]'>
                                        {daysMap[item.dayoftheweek] || ''}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                        <span className='max-sm:text-[12px]'>
                                            {formatTimeToAMPM(item.stops_work)}
                                        </span>
                                        <span className='max-sm:text-[12px]'>-</span>
                                        <span className='max-sm:text-[12px]'>
                                            {formatTimeToAMPM(item.starts_work)}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </section>
    );
}
