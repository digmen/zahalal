import React from 'react'

const workDays = [
    { name: 'Понедельник', time: '10:00 - 23:00' },
    { name: 'Вторник', time: '10:00 - 23:00' },
    { name: 'Среда', time: '10:00 - 23:00' },
    { name: 'Четверг', time: '10:00 - 23:00' },
    { name: 'Пятница', time: '10:00 - 23:00' },
    { name: 'Суббота', time: '10:00 - 23:00' },
    { name: 'Воскресенье', time: '10:00 - 23:00' }
]

export default function WorkTime() {
    const todayIndex = (new Date().getDay() + 6) % 7

    return (
        <section className="mt-4">
            <span className="text-lg font-semibold">Часы работы</span>
            <ul className="flex flex-col mt-4 rounded-2xl border border-gray-200 overflow-hidden">
                {workDays.map((item, idx) => {
                    const isToday = idx === todayIndex
                    return (
                        <li
                            key={idx}
                            className={`flex justify-between items-center border-b border-gray-200 py-3 px-4 font-normal even:bg-[#F3F0F3] ${isToday ? 'bg-[#F2FBF8] font-semibold text-black' : ''
                                }`}
                        >
                            <span>{item.name}</span>
                            <span>{item.time}</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
