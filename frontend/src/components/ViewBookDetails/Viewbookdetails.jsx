import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdLanguage } from "react-icons/md"
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const Viewbookdetails = () => {
  const { id } = useParams()
  const [Data, setData] = useState(null)
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-booksbyid/${id}`)
        setData(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetch()
  }, [])

  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-fav", {},{ headers })
   alert(response.data.message)
  }
  
  const handleCart = async () => {
    const response = await axios.post("http://localhost:1000/api/v1/add-to-cart", {},{ headers })
   alert(response.data.message)
  }

  const handleDelete = async () => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers })
   alert(response.data.message)
   navigate("/all-books")
  }

  if (!Data) {
    return <p>Loading...</p>
  }

  return (
    <div className='px-4 lg:px-12 lg:py-8  bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
      <div className=' w-full  lg:w-3/6  '> {""}
        <div className='flex flex-col md:flex-row bg-zinc-800 rounded p-12 mt-2 md:p-10 justify-around gap-0 md:gap-8  '>{""}
          <img src={Data.url} alt={Data.title || "Book Image"} className='h-[60vh]  md:h-[80vh] md:w-[60vh]  rounded ' />
          {isLoggedIn === true && role === "user" && (
            <div className='flex flex-row md:flex-col mt-8 md:mt-0 gap-3 md:gap-0 items-center justify-between md:justify-start'>
              <button onClick={handleFavourite} className='bg-zinc-200 rounded-full text-base md:text-3xl  p-3 text-red-600 flex items-center'><FaHeart /><span className='ms-4 block md:hidden'>Favourites</span></button>
              <button onClick={handleCart}  className='bg-blue-700 rounded-full text-base md:text-3xl  p-3 md:mt-6 text-zinc-200 flex items-center'><FaShoppingCart /><span className='ms-4 block md:hidden'>Add to cart</span></button>
            </div>
          )}
          {isLoggedIn === true && role === "admin" && (
            <div className='flex flex-row md:flex-col mt-4 md:mt-0 gap-3 md:gap-0 items-center justify-between md:justify-start'>
              <Link to={`/update-book/${id}`} className='bg-zinc-200 rounded-full text-base md:text-3xl  p-3 flex items-center'><FaEdit /><span className='ms-4 block md:hidden'>Edit</span></Link>
              <button onClick={handleDelete} className='bg-zinc-200 rounded-full text-base md:text-3xl  p-3 md:mt-6 flex items-center'><MdDelete /><span className='ms-4 block md:hidden'>Delete</span></button>
            </div>
          )}
        </div>
      </div>
      <div className='p-4 w-full lg:w-3/6 '>
        <h2 className='mt-2 text-zinc-50 text-center md:text-left font-semibold text-4xl'>{Data.title}</h2>
        <p className='mt-0 text-center md:text-left text-gray-400'>by {Data.author}</p>
        <p className='mt-4 text-center md:text-left text-zinc-400 text-lg'>{Data.description}</p>
        <p className='mt-2 flex items-center text-center justify-center md:justify-start text-zinc-400 text-lg'>
          <MdLanguage className='me-3 ' /> {Data.language}
        </p>
        <p className='mt-2 text-center md:text-left text-zinc-200 font-semibold text-xl'>
          Price: ₹ {Data.price}
        </p>
      </div>
    </div>
  )
}

export default Viewbookdetails
