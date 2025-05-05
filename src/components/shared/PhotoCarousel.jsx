'use client'
import React, { useCallback } from 'react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './PhotoCarouselArrowButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const PhotoCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

    const onNavButtonClick = useCallback((emblaApi) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop
        resetOrStop()
    }, [])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)

    return (
        <section className="flex w-full justify-between h-full mx-7">
            <div className="grid grid-cols-1 items-center gap-[0.6rem]">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <section className='photo_carousel'>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.map((index) => (
                            <div className="embla__slide h-[650px] w-full rounded-[10px] overflow-hidden" key={index}>
                                <Image
                                    src='/images/carousel.jpg'
                                    alt='img'
                                    width={900}
                                    height={900}
                                    className='rounded-[10px] w-full h-[650px] object-cover hover:scale-105 transition-all duration-300 ease-in-out' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-1 items-center gap-[0.6rem]">
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </section>
    )
}

export default PhotoCarousel
