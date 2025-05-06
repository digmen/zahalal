'use client'
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Star } from 'lucide-react'

export default function Reviews() {
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState([
        { name: 'Садаф Нурс', rating: 5, text: 'Очень хорошая еда! Я целый год не прикасался к еде из магазинов (по разным причинам, включая слухи, что они не халяльные), пока не увидел отзывы об этом и не решил попробовать. Куриный шашлык великолепен. Постная куриная грудка, рис' },
        { name: 'Самана Мухтар', rating: 4, text: 'Определенно рекомендую, очень хорошая еда из супермаркета, определенно не пожалеете!' },
    ])
    const [form, setForm] = useState({ name: '', rating: 0, text: '' })

    const handleSubmit = () => {
        if (!form.name || !form.rating || !form.text) return
        setReviews([...reviews, form])
        setForm({ name: '', rating: 0, text: '' })
        setIsOpen(false)
    }

    return (
        <section className="mt-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl text-[#656565]">Отзывы</h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm px-4 py-2 cursor-pointer bg-[#1A5D1A] text-white rounded-xl hover:bg-[#1A5D1A]/80 transition duration-200"
                    title='Добавить отзыв'
                    aria-label='Добавить отзыв'
                >
                    Добавить отзыв
                </button>
            </div>

            <section className="mt-4 rounded-2xl overflow-hidden w-full min-h-[200px] py-10">
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
