import type { NextPage } from 'next'
import Wrapper from "../components/Wrapper";
import Landing from "../components/Landing";

const Home: NextPage = () => {
  return (
      <Wrapper title={'Timothy\'s Boilerplate'} description={'A FrontEnd for every single project I want to practice'}>
        <Landing/>
      </Wrapper>
  )
}

export default Home
