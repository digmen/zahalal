'use client'
import React, { useRef } from 'react'

export default function VideoPreview() {
    const videoRef = useRef(null)

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    return (
        <section>
            <div
                className="relative w-full h-[400px] bg-[#F5F5F5] rounded-3xl mt-4 overflow-hidden"
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
