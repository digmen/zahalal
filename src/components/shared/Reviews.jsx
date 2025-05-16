'use client'
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Star } from 'lucide-react'

export default function Reviews() {
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState([
        { name: 'Садаф Нурс', rating: 2, text: 'Очень хорошая еда! Я целый год не прикасался к еде из магазинов (по разным причинам, включая слухи, что они не халяльные), пока не увидел отзывы об этом и не решил попробовать. Куриный шашлык великолепен. Постная куриная грудка, рис' },
        { name: 'Самана Мухтар', rating: 1, text: 'Определенно рекомендую, очень хорошая еда из супермаркета, определенно не пожалеете!' },
    ])
    const [form, setForm] = useState({ name: '', rating: 0, text: '' })

    const handleSubmit = () => {
        if (!form.name || !form.rating || !form.text) return
        setReviews([...reviews, form])
        setForm({ name: '', rating: 0, text: '' })
        setIsOpen(false)
    }

    const returningUsersPercent = Math.round(
        (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100
    )

    return (
        <section className="mt-10">
            <h1 className="text-2xl text-black">Отзывы</h1>
            <div className="flex justify-between items-end border-[#F3F0F3] border-[2px] px-4 py-8 rounded-2xl mt-4 max-md:py-4 max-sm:flex-col max-sm:gap-4">
                <div className='flex gap-4 items-center'>
                    <div>
                        {reviews.length > 0 && (
                            <div className="px-2 py-1 mt-2">
                                <span className="text-[24px] text-black">{reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length}</span>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={24}
                                    fill={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) ? 'red' : 'none'}
                                    stroke="red"
                                />
                            ))}
                        </div>
                        <span className="text-[16px] text-[#666]">
                            На основе {reviews.length} отзывов
                        </span>
                        <span className="text-[16px] text-[#666]">
                            {returningUsersPercent}% готовы вернуться
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm px-4 py-2 cursor-pointer bg-[#1A5D1A] text-white rounded-xl hover:bg-[#1A5D1A]/80 transition duration-200 max-sm:w-full"
                    title='Добавить отзыв'
                    aria-label='Добавить отзыв'
                >
                    Добавить отзыв
                </button>
            </div>

            <section className="rounded-2xl overflow-hidden w-full min-h-[200px] py-10">
                {reviews.length === 0 ? (
                    <p className="text-[#999] text-center">Отзывов пока нет</p>
                ) : (
                    reviews.map((r, idx) => (
                        <div key={idx} className="border-b py-4 last:border-none">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-[#333]">{r.name}</p>
                                <div className="flex items-center gap-1 bg-[#F3F0F3] rounded px-2 py-1">
                                    <Star
                                        size={16}
                                        fill='red'
                                        stroke="red"
                                    />
                                    <span className="text-[16px] text-black">{r.rating}</span>
                                </div>
                            </div>
                            <p className="text-sm text-black mt-1 w-[80%]">{r.text}</p>
                        </div>
                    ))
                )}
            </section>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
                <Dialog.Panel className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">
                    <Dialog.Title className="text-xl font-semibold text-[#333]">Новый отзыв</Dialog.Title>

                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2"
                    />

                    <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={24}
                                className="cursor-pointer"
                                fill={i < form.rating ? 'red' : 'none'}
                                stroke="red"
                                onClick={() => setForm({ ...form, rating: i + 1 })}
                            />
                        ))}
                    </div>

                    <textarea
                        placeholder="Ваш отзыв"
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 h-24 resize-none"
                    />

                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm rounded-xl border border-gray-300"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm rounded-xl bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                        >
                            Сохранить
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </section>
    )
}
