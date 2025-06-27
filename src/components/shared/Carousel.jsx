import EmblaCarousel from './EmblaCarousel'

export default function Carousel({ featuredData }) {
    const OPTIONS = { loop: true, slidesToScroll: 'auto' }

    return <EmblaCarousel slides={featuredData} options={OPTIONS} />
}
