import {ReactElement, useEffect, useRef, useState} from "react";

export default function CarouselImage() {
    const [imageCarousel, setImageCarousel] = useState<ReactElement[]>([
        <img
            key={1}
            className={'absolute inset-0-w w-full -full object-cover'}
            src={'https://scontent.fsig3-1.fna.fbcdn.net/v/t39.30808-6/263567925_1912923012213114_268718145017859545_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=4H6rVFqw_moAX-OSzS3&tn=4vGQDt627NWECmYJ&_nc_ht=scontent.fsig3-1.fna&oh=00_AT90sec1RW6UHXlR-iD8EWv_XcntcT2ZXJQKtZ78h2_S7Q&oe=630B8B28'}
        />,
        <img
            key={2}
            className={'absolute inset-0-w w-full -full object-cover'}
            src={'/images/EmanuelNexGen.jpeg'}
        />,
    ])
    const [nextIndex, setNextIndex] = useState(0)
    const currentImage = useRef<ReactElement>(imageCarousel[1])

    useEffect(() => {
        setTimeout(() => {
            currentImage.current = imageCarousel[nextIndex % imageCarousel.length]
            setNextIndex((prevState) => prevState + 1)
        }, 2000)
    }, [currentImage.current])

    return (
        <div
            className="relative rounded w-full rounded h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            {currentImage.current}
        </div>
    )
}