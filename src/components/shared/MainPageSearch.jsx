'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function MainPageSearch() {
    const [locationData, setLocationData] = useState({
        city: '',
        district: '',
        street: '',
        houseNumber: '',
        country: '',
        postcode: '',
    })

    const [openModal, setOpenModal] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ru`)
                    const data = await res.json()
                    const address = data.address

                    setLocationData({
                        city: (address.city || address.town || address.village || address.county || '').replace(/^город\s+/i, ''),
                        district: address.city_district || '',
                        street: address.road || '',
                        houseNumber: address.house_number || '',
                        country: address.country || '',
                        postcode: address.postcode || '',
                    })
                } catch (error) {
                    console.error('Ошибка при обратном геокодировании:', error)
                }
            })
        } else {
            alert('Геолокация не поддерживается')
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                handleSearch()
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSearch = async () => {
        setLoading(true)

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&accept-language=ru&limit=100`
            )
            const data = await res.json()

            if (data.length > 0) {
                const filteredResults = data.map((item) => ({
                    city: item.address.city || item.address.state || item.address.town || item.address.village || '',
                    country: item.address.country || '',
                })).filter((item, index, self) =>
                    item.city && self.findIndex(r => r.city === item.city && r.country === item.country) === index
                )

                setResults(filteredResults.length ? filteredResults : [{ city: 'Не найдено', country: '' }])
            } else {
                setResults([{ city: 'Не найдено', country: '' }])
            }
        } catch (error) {
            setResults([{ city: 'Ошибка', country: '' }])
        } finally {
            setLoading(false)
        }
    }

    const handleLocationClick = () => {
        setOpenModal(true)
    }

    const handleSelectCity = (city) => {
        setLocationData((prev) => ({ ...prev, city }))
        setOpenModal(false)
        setQuery('')
        setResults([])
    }

    return (
        <section className='max-md:w-full max-md:px-6'>
            <section className='flex items-center justify-between relative'>
                <button
                    onClick={handleLocationClick}
                    className='text-[14px] font-bold text-[#131105] flex items-center gap-2 hover:underline cursor-pointer'
                >
                    <Image
                        src="/images/geotag.svg"
                        alt='geotag'
                        width={24}
                        height={24} />
                    Где вы находитесь?
                    <Image
                        src="/images/arrow.svg"
                        alt='arrow'
                        width={20}
                        height={20}
                        className='rotate-180'
                    />
                </button>
                <button
                    className='text-[14px] font-bold text-[#131105] hover:underline'
                    onClick={handleGetLocation}>
                    Где я?
                </button>
                {openModal && (
                    <div className="absolute top-[30px] border-[1px] border-gray-400 flex items-center justify-center z-50 rounded overflow-hidden">
                        <div className="bg-white rounded w-[320px] max-w-md shadow-lg">
                            <form onSubmit={(e) => e.preventDefault()}
                                className="p-4 flex flex-col items-center justify-center">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Введите город или адрес"
                                    className="w-full border-[2px] border-gray-300 p-2 rounded  focus:border-blue-500 transition duration-300 ease-in-out"
                                />
                            </form>

                            {loading && <p className="text-gray-500 p-4 bg-amber-50">Загрузка...</p>}

                            {results.length > 0 && (
                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                    {results.map((result, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer m-0 p-2 py-4 rounded hover:bg-gray-100 border-t border-gray-200"
                                            onClick={() => handleSelectCity(result.city)}
                                        >
                                            {result.city}, {result.country}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className='m-4 flex justify-center items-center'>
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="text-sm text-black w-full p-2  border border-gray-300 rounded hover:bg-black hover:text-white transition duration-300 ease-in-out"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }
            </section>

            <form className='max-md:w-full flex w-[456px] items-center justify-between mt-2.5 bg-[#F3F0F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2'>
                <input
                    type="text"
                    placeholder='Поиск ресторанов, мечетей или услуг'
                    className='w-full'
                />
                <button className='px-4 py-2'>
                    <Image
                        src="/images/search.svg"
                        alt='search'
                        width={24}
                        height={24} />
                </button>
            </form>
        </section>
    )
}
