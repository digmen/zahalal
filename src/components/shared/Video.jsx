'use client'
import React, { useRef } from 'react'

export default function VideoPreview({ restaurantVideo }) {
    // В этом варианте для каждого видео создаём отдельный ref
    // Чтобы было проще, можно использовать массив рефов через useRef + useEffect, но для простоты сделаем через callback ref

    // Создадим массив рефов для видео
    const videoRefs = React.useRef([])

    const handleMouseEnter = (index) => {
        const video = videoRefs.current[index]
        if (video) {
            video.play().catch((error) => {
                // Игнорируем ошибку, если play() был прерван
                if (error.name !== 'AbortError') {
                    console.error(error)
                }
            })
        }
    }

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index]
        if (video) {
            video.pause()
        }
    }
    return (
        <section className="flex flex-wrap gap-4">
            {restaurantVideo && restaurantVideo.length > 0 ? (
                restaurantVideo.map((video, index) => (
                    <div
                        key={video.id || index}
                        className="relative aspect-[9/16] w-[350px] bg-[#F5F5F5] rounded-xl mt-4 overflow-hidden max-lg:w-[300px] max-md:w-full max-md:aspect-[1/1]"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <video
                            ref={el => videoRefs.current[index] = el}
                            className="w-full h-full object-cover rounded-3xl"
                            muted
                            loop
                            controls
                        >
                            <source src={video.video} type="video/mp4" />
                            Ваш браузер не поддерживает видео.
                        </video>
                    </div>
                ))
            ) : (
                <></>
            )}
        </section>
    )
}
