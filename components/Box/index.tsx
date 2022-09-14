import * as THREE from 'three'
import {ThreeElements, useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";

export default function Box(props: ThreeElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 4 : 2}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={()=>setHover(false)}
        >
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}