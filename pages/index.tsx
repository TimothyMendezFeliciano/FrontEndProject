import type {NextPage} from 'next'
import Wrapper from "../components/Wrapper";
import {Canvas} from "@react-three/fiber";
import Box from "../components/Box";
import {PerspectiveCamera, WebGLRenderer} from 'three'
import {useEffect, useState} from "react";

const Home: NextPage = () => {
    const [camera, setCamera] = useState<PerspectiveCamera>()

    useEffect(() => {
        if (window) {
            const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
            camera.position.set(0, 0, 5)
            setCamera(camera)
        }
    }, [])
    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            {/*<SolarSystem/>*/}
            <Canvas camera={camera} gl={canvas => {
                const renderer = new WebGLRenderer({canvas})
                renderer.setSize(innerWidth, innerHeight)
                return renderer
            }}>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <Box position={[-2, 0, 0]}/>
            </Canvas>
        </Wrapper>
    )
}

export default Home
