'use client'
import React, { useEffect } from 'react'
import PhotoCarousel from './PhotoCarousel'

export default function ModalViewAllPhoto() {
    const [show, setShow] = React.useState(false)
    const OPTIONS = { loop: true, duration: 30 }
    const SLIDE_COUNT = 10
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    const handleOpenModalViewAllPhoto = () => {
        setShow(true)
    }

    const handleCloseModal = () => {
        setShow(false)
    }

    useEffect(() => {
        if (show) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [show])

    return (
        <>
            {show && (
                <section className='fixed inset-0 z-1000 w-screen h-screen bg-opacity-80 bg-black backdrop-blur-sm'>
                    <div onClick={(e) => e.stopPropagation()} className='flex justify-end pr-3 pt-3'>
                        <button type="button" title="Close" aria-label="Close" onClick={handleCloseModal}
                            className='group cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-50 backdrop-blur-sm rounded-full hover:bg-[#131105] hover:text-white transition-colors'>
                            <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                                <g fill="currentColor">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className='flex items-center w-screen h-screen justify-center'>
                        <PhotoCarousel slides={SLIDES} options={OPTIONS} />
                    </div>
                </section>
            )
            }
            <button
                className='cursor-pointer'
                onClick={handleOpenModalViewAllPhoto}
            >
                Посмотреть все фотки
            </button>
        </>
    )
}
