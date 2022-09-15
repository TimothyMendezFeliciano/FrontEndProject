import {ThreeElements, useFrame} from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import {DoubleSide} from "three";

export default function Plane(props: ThreeElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)

    useFrame((state, delta, frame) => {
        mesh.current.rotation.x += 0.01
        // mesh.current.rotation.z += 0.01
    })

    useEffect(() => {
        const {geometry} = mesh.current
        const {position} = geometry.attributes
        for (let i = 0; i < position.array.length; i += 3) {
            const x = position.array[i]
            const y = position.array[i + 1]
            const z = position.array[i + 2]
            // @ts-ignore
            position.array[i] = x
            // @ts-ignore
            position.array[i + 1] = y
            // @ts-ignore
            position.array[i + 2] = z + Math.random()
        }
        position.needsUpdate = true
        geometry.computeVertexNormals()
    }, [])

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1 : 0.5}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <planeGeometry
                args={[5, 5, 10, 10]}/>
            <meshPhongMaterial color={hovered ? 'red' : 'gray'} side={DoubleSide} flatShading={true}/>
        </mesh>
    )
}