import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from "../Bookcard/Bookcard"
const Favourties = () => {
  const [favbooks, setfavbooks] = useState([])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-fav", { headers })
      setfavbooks(response.data.data)
    }
    fetch()
  }, [favbooks])

  return (
    <div className='h-screen'>
      {favbooks.length === 0 && (<div className='flex flex-col h-[100%] justify-center items-center text-5xl font-semibold'   >
        No favourite books
        <img src="https://cdn-icons-png.freepik.com/256/10218/10218522.png?semt=ais_hybrid" alt="" /></div>
        )}
      <div className='grid m-4 md:m-0 md:grid-cols-3 md:ms-4 gap-4'>
        {favbooks && favbooks.map((items, i) =>
          <div key={i}>
            <BookCard data={items} favbooks={true} />
          </div>)}
      </div>
    </div>
  )
}

export default Favourties
