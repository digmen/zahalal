'use client'
import React, { useCallback } from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'

const EmblaCarousel = (props) => {
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
    <section className="embla">
      <div className="embla__controls">
        <div>
          <h1 className='font-bold text-2xl'>В тренде 🔥</h1>
        </div>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <Link href={`/details/${index}`} className="embla__slide cursor-pointer h-[200px] w-full rounded-[10px] overflow-hidden relative max-lg:h-[150px]" key={index}>
              <Image
                src='/images/carousel.jpg'
                alt='img'
                width={300}
                height={0}
                className='rounded-[10px] w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out' />
              <div className="absolute z-10 bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                <div className="text-white text-xs leading-[14px] uppercase tracking-[0.4px] font-bold font-satoshi font-feature-['ss02','ss03']">Late night shisha & more</div>
                <h3 className="text-white text-[18px] leading-6 tracking-[-0.135px] font-bold font-satoshi font-feature-['ss01']">Hookah Lounges</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
