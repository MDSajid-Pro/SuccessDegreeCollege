import React from 'react'
import Hero from './Hero'
import PrincipalMessage from './PrincipalMessage'
import Gallery from './Gallery'
import Activities from './Activities'

const Home = () => {
  return (
      <div>
      <Hero />
      <PrincipalMessage />
      <Gallery />
      <Activities/>
    </div>
  )
}

export default Home