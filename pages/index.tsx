import type {NextPage} from 'next'
import Wrapper from "../components/Wrapper";
import SolarSystem from '../components/SolarSystem'

const Home: NextPage = () => {
    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            <SolarSystem/>
        </Wrapper>
    )
}

export default Home
