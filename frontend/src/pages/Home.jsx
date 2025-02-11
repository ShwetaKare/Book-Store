import React from 'react'
import Hero from '../components/Home/Hero'
import Recentlyadded from '../components/Home/Recentlyadded'

const Home = () => {
  return (
    <div className='bg-zinc-800 text-white px-20 py-12'>
     <Hero/>
     <Recentlyadded/>
    </div>
  )
}

export default Home
