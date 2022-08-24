import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Wrapper from "../components/Wrapper";

const Home: NextPage = () => {
  return (
      <Wrapper title={'Timothy\'s Boilerplate'} description={'A FrontEnd for every single project I want to practice'}>
        Practicing
      </Wrapper>
  )
}

export default Home
