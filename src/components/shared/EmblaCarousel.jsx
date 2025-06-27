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

  if (!slides?.length) return null

  return (
    <section className="embla">
      <div className="embla__controls">
        <div>
          <h1 className='font-bold text-2xl'>В тренде 🔥</h1>
        </div>

        {slides.length <= 3 && (
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        )}
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <Link
              href={`/details/${item?.card?.id}`}
              className="embla__slide cursor-pointer h-[200px] w-[300px] rounded-[10px] overflow-hidden relative max-lg:h-[150px] max-md:w-full max-md:h-[200px]"
              key={index}
            >
              <Image
                src={item?.card?.face_img}
                alt='img'
                width={300}
                height={200}
                className='rounded-[10px] w-[300px] h-[200px] object-cover max-lg:h-[150px] max-md:w-full max-md:h-[200px]'
              />
              <div className="absolute z-10 bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                <div className="text-white text-xs leading-[14px] uppercase tracking-[0.4px] font-bold font-satoshi font-feature-['ss02','ss03']">
                  {item?.card?.title}
                </div>
                <h3 className="text-white text-[18px] leading-6 tracking-[-0.135px] font-bold font-satoshi font-feature-['ss01']">
                  {item?.card?.type}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
