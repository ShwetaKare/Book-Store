import React from 'react'
import Bookcard from '../Bookcard/Bookcard'
import { useState , useEffect } from 'react'
import axios from 'axios'
const Recentlyadded = () => {
    const [Data, setData] = useState()
    useEffect(() => {
     const fetch = async()=>{
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books")
        setData(response.data.data)
     }
     fetch()
    }, [])
    
  return (
    <div className='mt-10 px-4'>
      <h1 className='text-yellow-400 text-xl md:text-3xl pt-4 text-center md:text-left'>Recently Added Books</h1>
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {Data && Data.map((items , i) => <div key={i}><Bookcard data={items}/>{""}</div>)}

    </div>
    </div>
  )
}

export default Recentlyadded
