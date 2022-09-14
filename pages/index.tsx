import type {NextPage} from 'next'
import Wrapper from "../components/Wrapper";
import {Canvas} from "@react-three/fiber";
import Box from "../components/Box";

const Home: NextPage = () => {
    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            {/*<SolarSystem/>*/}
            <Canvas>
                <ambientLight/>
                <pointLight position={[10,10,10]}/>
                <Box position={[-4,0,0]} />
                <Box position={[4,0,0]}/>
            </Canvas>
        </Wrapper>
    )
}

export default Home
