import {ThreeElements, useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import {DoubleSide} from "three";

export default function Plane(props: ThreeElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)

    useFrame((state, delta, frame) => {
        mesh.current.rotation.x += 0.01
        mesh.current.rotation.y += 0.01
    })

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1 : 0.5}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <planeGeometry args={[5, 5, 10, 10]}/>
            <meshBasicMaterial color={hovered ? 'red' : 'yellow'} side={DoubleSide}/>
        </mesh>
    )
}