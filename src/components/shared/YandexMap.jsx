'use client'
import React from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

export default function YandexMap() {
    const coordinates = [55.753215, 37.622504]

    return (
        <section className="mt-4">
            <h1 className='text-2xl text-[#656565]'>Адрес </h1>
            <section className='mt-4 rounded-2xl overflow-hidden w-full h-[400px] border-[1px] border-[#E0E0E0] bg-white'>
                <YMaps>
                    <Map
                        defaultState={{
                            center: coordinates,
                            zoom: 16,
                            controls: ['zoomControl', 'fullscreenControl']
                        }}
                        modules={['control.ZoomControl', 'control.FullscreenControl']}
                        className="w-full h-full"
                    >
                        <Placemark geometry={coordinates} />
                    </Map>
                </YMaps>
            </section>
        </section>
    )
}
