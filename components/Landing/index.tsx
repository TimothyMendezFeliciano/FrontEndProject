import {ReactElement, useEffect, useRef, useState} from "react";
import CarouselImage from "../Carousel/Image";

export default function Landing() {

    return (
        <div className={'lg:relative'}>
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight lg:text-5xl lg:tracking-tight xl:text-6xl xl:tracking-tight">
                        <span className="block xl:inline">Obtain guided routines from your own</span>{' '}
                        <span className="block text-red-600 xl:inline">personal trainer</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit
                        sunt
                        amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <button
                                className="btn-primary-big"
                            >
                                Sign up
                            </button>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <button
                                className="btn-orange-big"
                            >
                                Find Trainer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CarouselImage/>
        </div>
    )
}