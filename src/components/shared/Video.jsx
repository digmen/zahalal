'use client'
import React, { useRef } from 'react'

export default function VideoPreview() {
    const videoRef = useRef(null)

    const handleMouseEnter = () => {
        videoRef.current?.play()
    }

    const handleMouseLeave = () => {
        videoRef.current?.pause()
    }

    return (
        <section>
            <div
                className="relative aspect-[9/16] w-[350px] bg-[#F5F5F5] rounded-xl mt-4 overflow-hidden max-lg:w-[300px] max-md:w-full max-md:aspect-[1/1]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-3xl"
                    muted
                    loop
                    controls
                >
                    <source src="/images/video.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            </div>
        </section>
    )
}
