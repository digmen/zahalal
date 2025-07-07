'use client'
import { API_URL } from '@/api/Api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function MainPageSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [locationData, setLocationData] = useState({
        city: '',
        country: '',
    })
    const [openModal, setOpenModal] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const [querySearcher, setQuerySearcher] = useState('')

    const YANDEX_API_KEY = '71b433de-5367-42b9-8938-4bc5cf002f63'

    // --- Инициализация из searchParams ---
    useEffect(() => {
        const city = searchParams.get('city') || ''
        const country = searchParams.get('country') || ''
        const search = searchParams.get('search') || ''
        setLocationData(prev => ({ ...prev, city, country }))
        setQuerySearcher(search)
    }, [])

    // --- Обновление searchParams при смене города или поиска ---
    useEffect(() => {
        if (!locationData.city && !querySearcher) return
        const params = new URLSearchParams()
        if (locationData.city) params.set('city', locationData.city)
        if (querySearcher) params.set('search', querySearcher)
        router.replace(`?${params.toString()}`)
    }, [locationData.city, locationData.country, querySearcher])


    // --- Поиск города по запросу в модалке ---
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                handleSearch()
            } else {
                setResults([])
            }
        }, 400)
        return () => clearTimeout(timeoutId)
    }, [query])

    // --- Поиск городов через Яндекс ---
    const handleSearch = async () => {
        setLoading(true)
        try {
            const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${encodeURIComponent(query + ', Россия')}&format=json&lang=ru_RU`
            const res = await fetch(url)
            const data = await res.json()
            const members = data.response.GeoObjectCollection.featureMember || []

            const filteredResults = members.map((item) => {
                const geo = item.GeoObject
                const address = geo.metaDataProperty.GeocoderMetaData.Address
                let city = ''
                let country = ''
                if (address?.Components) {
                    city = address.Components.find(x => x.kind === 'locality')?.name ||
                        [...address.Components].reverse().find(x => x.kind === 'province')?.name ||
                        geo.name || ''
                    country = address.Components.find(x => x.kind === 'country')?.name || ''
                } else {
                    city = geo.name || ''
                    country = geo.description || ''
                }
                return { city, country }
            }).filter(item => item.city)

            const inputValue = query.trim().toLowerCase()
            const strictlyFilteredResults = filteredResults
                .filter(item =>
                    item.city.toLowerCase().includes(inputValue) && item.country === 'Россия'
                )
            const uniqueResults = strictlyFilteredResults.filter(
                (item, index, self) =>
                    self.findIndex(r => r.city === item.city && r.country === item.country) === index
            )
            setResults(uniqueResults)
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    // --- Выбор города из списка ---
    const handleSelectCity = ({ city, country }) => {
        setLocationData(prev => ({ ...prev, city, country }))
        setOpenModal(false)
        setQuery('')
        setResults([])
    }

    // --- Получить город по геолокации ---
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${longitude},${latitude}&format=json&lang=ru_RU`
                    const res = await fetch(url)
                    const data = await res.json()
                    const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject
                    const address = geoObject?.metaDataProperty?.GeocoderMetaData?.Address
                    setLocationData(prev => ({
                        ...prev,
                        city: address?.Components?.find(x => x.kind === 'locality')?.name || '',
                        country: address?.Components?.find(x => x.kind === 'country')?.name || '',
                    }))
                } catch { }
            })
        } else {
            alert('Геолокация не поддерживается')
        }
    }

    // --- Сброс города и страны ---
    const handleClearLocation = () => {
        setLocationData({ city: '', country: '' })
        // Если хочешь убрать и из searchParams после сброса:
        const params = new URLSearchParams()
        if (querySearcher) params.set('search', querySearcher)
        router.replace(`?${params.toString()}`)
    }

    // --- Сброс поиска ---
    const handleClearSearch = () => {
        setQuerySearcher('')
        // Если хочешь убрать и из searchParams после сброса:
        const params = new URLSearchParams()
        if (locationData.city) params.set('city', locationData.city)
        if (locationData.country) params.set('country', locationData.country)
        router.replace(`?${params.toString()}`)
    }

    return (
        <article className='flex flex-col gap-6 items-center justify-center'>
            <section className='flex flex-col gap-2 items-center justify-center'>
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={190}
                    height={100}
                    className='w-[190px] h-[100px]'
                />
                <h1 className='text-[#111111] text-[32px] font-bold max-lg:text-[24px] max-md:text-[18px] text-center max-sm:text-[16px]'>
                    Найдите халяльные рестораны, мечети и сервисы
                </h1>
                <p className='text-[#555555] text-[18px] font-normal max-sm:text-[14px] text-center'>
                    Поиск по всей России
                </p>
            </section>
            <section className='max-md:w-full max-md:px-6'>
                <section className='flex items-center justify-between relative'>
                    {locationData?.city || locationData?.country ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setOpenModal(true)}
                                className='text-[14px] font-bold text-[#131105] flex items-center gap-2 hover:underline cursor-pointer'
                            >
                                <Image
                                    src="/images/geotag.svg"
                                    alt='geotag'
                                    width={24}
                                    height={24}
                                />
                                {locationData.city}, {locationData.country}
                            </button>
                            <button
                                className='ml-2 text-gray-400 hover:text-black transition text-lg'
                                onClick={handleClearLocation}
                                aria-label='Сбросить город'
                                type="button"
                            >×</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setOpenModal(true)}
                            className='text-[14px] font-bold text-[#131105] flex items-center gap-2 hover:underline cursor-pointer'
                        >
                            <Image
                                src="/images/geotag.svg"
                                alt='geotag'
                                width={24}
                                height={24}
                            />
                            Где вы находитесь?
                            <Image
                                src="/images/arrow.svg"
                                alt='arrow'
                                width={20}
                                height={20}
                                className='rotate-180'
                            />
                        </button>
                    )}
                    <button
                        className='text-[14px] font-bold text-[#131105] hover:underline cursor-pointer'
                        onClick={handleGetLocation}>
                        Где я?
                    </button>
                    {openModal && (
                        <div className="absolute top-[30px] border-[1px] border-gray-400 flex items-center justify-center z-50 rounded overflow-hidden">
                            <div className="bg-white rounded w-[320px] max-w-md shadow-lg">
                                <form onSubmit={e => e.preventDefault()}
                                    className="p-4 flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Введите город или адрес"
                                        className="w-full border-[2px] border-gray-300 p-2 rounded  focus:border-blue-500 transition duration-300 ease-in-out"
                                    />
                                </form>
                                {loading && <p className="text-gray-500 p-4 bg-amber-50">Загрузка...</p>}
                                {!loading && query.trim() && (
                                    results.length > 0 ? (
                                        <div className="space-y-2 max-h-[200px] overflow-y-auto overflow-x-hidden">
                                            {results.map((result, index) => (
                                                <div
                                                    key={index}
                                                    className="cursor-pointer m-0 px-5 py-4 rounded hover:bg-gray-100 border-t border-gray-200"
                                                    onClick={() => handleSelectCity(result)}
                                                >
                                                    {result.city}, {result.country}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 px-5 py-4 bg-red-50 rounded text-center">Ничего не найдено</p>
                                    )
                                )}
                                <div className='m-4 flex justify-center items-center'>
                                    <button
                                        onClick={() => {
                                            setOpenModal(false)
                                            setQuery('')
                                            setResults([])
                                        }}
                                        className="text-sm text-black w-full p-2  border border-gray-300 rounded hover:bg-black hover:text-white transition duration-300 ease-in-out"
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                <form
                    onSubmit={e => e.preventDefault()}
                    className='max-md:w-full flex w-[456px] items-center justify-between mt-2.5 bg-[#F3F0F3]  rounded-[10px] px-4 py-2'
                >
                    <div className="relative w-full">
                        <input
                            type='text'
                            value={querySearcher}
                            onChange={e => setQuerySearcher(e.target.value)}
                            placeholder='Поиск ресторанов, мечетей или услуг'
                            className='w-full bg-transparent outline-none pr-8'
                        />
                        {querySearcher && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg"
                                aria-label="Сбросить поиск"
                            >×</button>
                        )}
                    </div>
                    <button
                        className='px-4 py-2 cursor-pointer'
                        // onClick={searchCards}
                        // disabled={loading}
                        type='submit'
                        aria-label='Search'
                    >
                        <Image src='/images/search.svg' alt='search' width={24} height={24} />
                    </button>
                </form>
            </section>
        </article>
    )
}
