import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  
  const [cart, setcart] = useState()
  const [total, settotal] = useState(0)
   const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
 
  }


  useEffect(() => {
  const fetch = async () =>{
    const response = await axios.get("http://localhost:1000/api/v1/get-user-cart" , {headers} )
    setcart(response.data.data)
  
  }
  fetch()
  }, [cart])
  
  const deleteitem = async (bookid) =>{
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}` , {} , {headers})
    
    alert(response.data.message)
  }

useEffect(() => {
  if(cart && cart.length >0 ){
    let total =0
    cart.map((items) => {
      total += items.price
    })
    settotal(total)
    total = 0
  }
}, [cart])

const placeorder = async () =>{
  try{
    const response = await axios.post("http://localhost:1000/api/v1/place-order" ,{order:cart} ,{headers})
    alert(response.data.message)
    navigate("/profile/orderHistory")
  }catch(error){
    console.log(error)
  }
}

  return (
    <div className='bg-zinc-700 px-12 h-screen'>
      {!cart && (<div>Loading...</div>) }
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl md:text-6xl font-semibold text-zinc-200'>
              Empty Cart
            </h1>
            <img className='mt-2 ' src="https://cdn-icons-png.freepik.com/256/16530/16530579.png?semt=ais_hybrid" alt="empty cart" />
          </div>
        </div>
      ) }
      {cart && cart.length>0 && (
        <>
        <h1 className='text-5xl pt-5 font-semibold text-zinc-400 mb-8'>Your Cart</h1>       
        {cart.map((items , i) => (
          <div key={i} className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-500 justify-between items-center'>
            <div className='flex flex-row justify-start gap-8 items-center'>
            <img src={items.url} alt="/" className='h-[10vh] md:h-[13vh] object-cover' />
            <div className='w-full md:w-auto '>
              <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
              <p className='text-normal text-zinc-300 mt-2 hidden md:block'>{items.description.slice(0,100)}...</p>
              <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden' >{items.description.slice(0,65)}...</p>
              <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{items.description.slice(0,100)}...</p>
            </div>
            </div>
            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
              <h2 className='text-zinc-100 text-2xl font-semibold flex'>₹{items.price}</h2>
              <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={()=> deleteitem(items._id)}><AiFillDelete/></button>
            </div>
          </div>
        ))}
        </>
      ) }
    {cart && cart.length > 0 &&(
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 text-zinc-400 rounded'>
          <div className='text-3xl text-zinc-200 font-semibold'>Total Amount</div>
          <div>
            <h2>Quantity : {cart.length}</h2>  <h2>₹{total}</h2>
          </div>
          <div onClick={placeorder} className='bg-zinc-100 rounded mt-2 px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-600 hover:text-zinc-200 '>
            <button>Place Your Order</button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default Cart
