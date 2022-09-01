import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';

export default function CarouselImage() {

    return (
        <Carousel
            infiniteLoop={true}
            autoPlay={true}
            className={'relative rounded w-full rounded h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full'}
        >
            <div>
                <img
                    key={1}
                    src={'/images/GabrielMedrano.png'}
                />
                <p className={'legend'}>Gabriel Medrano</p>
            </div>
            <div>
                <img
                    key={2}
                    src={'/images/EmanuelNexGen.jpeg'}
                />
                <p className={'legend'}>Emanuel Batista</p>
            </div>
        </Carousel>
    )
}