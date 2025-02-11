import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Bookcard = ({ data, favbooks }) => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  }

  const handleremovebook = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/delete-from-fav", {}, { headers })
    alert(response.data.message)
  }

  return (
    <div className='bg-zinc-600 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[40vh] p-1' />
        </div>
        <h2 className='mt-2  text-left font-semibold text-xl'>{data.title}</h2>
        <h2 className='mt-2  text-left text-gray-400'>{data.author}</h2>
        <h2 className='mt-2  text-left text-zinc-200 font-semibold text-xl'>₹ {data.price}</h2>
      </Link>
      {favbooks && (
        <button onClick={handleremovebook} className='bg-yellow-400 text-zinc-200 font-semibold text-base rounded-lg p-1 mt-2 hover:bg-zinc-200 hover:text-yellow-400 transition-all duration-300'>Remove from favourites</button>
      )}
    </div>
  )
}

export default Bookcard
