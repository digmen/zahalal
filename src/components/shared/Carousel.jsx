import EmblaCarousel from './EmblaCarousel'

export default function Carousel() {
    const OPTIONS = { loop: true, slidesToScroll: 'auto' }
    const SLIDE_COUNT = 10
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}
