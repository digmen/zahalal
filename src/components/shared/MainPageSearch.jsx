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
            setCity('Геолокация не поддерживается')
        }
    }

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])  // изменили с одиночного результата на массив
    const [loading, setLoading] = useState(false)

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
                const filteredResults = data.filter((item) => {
                    return item.address &&
                        (item.address.addresstype?.toLowerCase() === 'city' || item.address.addresstype?.toLowerCase() === 'country');

                }).map((item) => ({
                    city: item.address.city || item.address.state || item.address.town || item.address.village || '',
                    country: item.address.country || '',
                }));
                console.log(filteredResults);


                if (filteredResults.length > 0) {
                    setResults(filteredResults)
                } else {
                    setResults([{ city: 'Не найдено', country: '' }])
                }
            } else {
                setResults([{ city: 'Не найдено', country: '' }])
            }
        } catch (error) {
            setResults([{ city: 'Ошибка', country: '' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section>
            <section className='flex items-center justify-between'>
                <button className='text-[14px] font-bold text-[#131105] flex items-center gap-2 hover:underline'>
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
            </section>

            <form className='flex w-[456px] items-center justify-between mt-2.5 bg-[#F3F0F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2'>
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

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Введите город или адрес"
                    className="border p-2"
                />
            </form>

            {loading && <p>Загрузка...</p>}

            {results.length > 0 && (
                <div className="mt-2">
                    {results.map((result, index) => (
                        <div key={index}>
                            <p>{result.city} {result.country}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
