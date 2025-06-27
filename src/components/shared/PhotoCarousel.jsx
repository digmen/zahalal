'use client'
import React, { useCallback } from 'react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './PhotoCarouselArrowButton'
import Fade from 'embla-carousel-fade'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const PhotoCarousel = (props) => {
    const { options, restaurantPhoto } = props

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(), Fade()])

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
        <section className="flex w-full justify-between h-full m-7 max-sm:m-0">
            <div className="grid grid-cols-1 items-center gap-[0.6rem]">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <section className='photo_carousel'>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {restaurantPhoto.map((item, index) => (
                            <div className="embla__slide w-6/12 overflow-hidden h-auto max-h-[80vh] flex items-center justify-center" key={index}>
                                <Image
                                    src={item.image}
                                    alt='img'
                                    width={400}
                                    height={0}
                                    className='max-sm:w-[250px] w-[400px] h-auto max-h-[80vh] object-contain' />
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
