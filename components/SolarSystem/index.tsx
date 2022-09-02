import {useEffect, useRef, useState} from "react";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";

export default function SolarSystem() {
    const [fov, setFOV] = useState(75)
    const [scene, setScene] = useState<Scene>()
    const [camera, setCamera] = useState<PerspectiveCamera>()
    const [renderer, setRenderer] = useState<WebGLRenderer>()
    const [controls, setControls] = useState()
    const [stats, setStats] = useState()
    const [geometry, setGeometry] = useState()
    const [material, setMaterial] = useState()
    const [cube, setCube] = useState()
    const canvasRef = useRef()

    function initScene() {
        setCamera(new PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        ))
        setScene(new Scene())
        setRenderer(new WebGLRenderer({

        }))
    }

    return (
        <div className={'flex flex-col items-center justify-center'}>
            <canvas ref={canvasRef} id={'myThreeJsCanvas'}/>
        </div>
    )
}