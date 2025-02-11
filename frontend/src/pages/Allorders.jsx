import axios, { Axios } from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import OrderHistory from '../components/Profile/OrderHistory';
import SeeUserData from './SeeUserData';
const Allorders = () => {
  const [Orders, setOrders] = useState()
  const [Options, setOptions] = useState(-1)
  const [Values, setValues] = useState({ status: "" })
  const [userDiv, setuserDiv] = useState("hidden")
  const [userDivData, setuserDivData] = useState()
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-history", { headers })
      setOrders(response.data.data)
    }
    fetch()
  }, [Orders])

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value })
  }

  const submitChanges = async (i) => {
    const id = Orders[i]._id
    const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Values, { headers })
    alert(response.data.message)
  }

  Orders && Orders.splice(Orders.length - 1, 1)

  return (
    <div className='h-screen'>
      {!Orders && (
        <div>
          Loading...
        </div>
      )}
      {Orders && Orders.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl md:text-6xl font-semibold text-zinc-200'>
              No Order History
            </h1>
            <img className='mt-2 ' src="https://w7.pngwing.com/pngs/428/775/png-transparent-history-icon-order-icon-angle-text-rectangle-thumbnail.png" alt="no history" />
          </div>
        </div>
      )}
      {Orders && Orders.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8 mt-4 text-center md:m-0'>All Orders</h1>
          <div className='mt-4 bg-zinc-900 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
            <FaUser />
            </div>
          </div>
          {Orders.map((items, i) => (
            <div key={i} className='w-full py-2 px-4 rounded flex gap-4 md:flex-row p-4 bg-zinc-900 hover:cursor-pointer hover:bg-zinc-600'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300' >{items.book.title}</Link>
              </div>
              <div className='w-[45%]'>
                <h1 className=''>{items.book.description.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>₹{items.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  <button className='hover:scale-10 transition-all duration-300' onClick={() => setOptions(i)}>
                    {items.status === "Order Placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "Cancelled" ? (
                      <div className='text-red-600'>{items.status}</div>
                    ) : (
                      <div className='text-green-600'>{items.status}</div>
                    )}
                  </button>
                  <div className={`${Options === i ? "flex" : "hidden"} flex mt-4`}>
                    <select name="status" id="" className='bg-gray-500 text-gray-200' onChange={change} value={Values.status}>
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Cancelled"
                      ].map((status, index) => {
                        return (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        );
                      })}
                    </select>
                    <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => {
                      setOptions(-1)
                      submitChanges(i)
                    }}>
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className='w-none md:w-[5%] ' >
                <button className='text-xl hover:text-orange-500'
                  onClick={() => {
                    setuserDiv("fixed")
                    setuserDivData(items.user)
                  }}>
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData 
        userDiv={userDiv}
        userDivData={userDivData}
        setuserDiv={setuserDiv}
        />
      )}
    </div>
  )
}

export default Allorders
