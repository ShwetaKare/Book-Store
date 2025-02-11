import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import {authActions} from "../../store/auth"
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role)
  return (
    <>
    {role === "user" && (
    <div className='w-full flex md:hidden items-center justify-between my-8'>
        <Link to={"/profile"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          Favourites
        </Link>
        <Link to={"/profile/orderHistory"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          Order History
        </Link>
        <Link to={"/profile/settings"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          Settings
        </Link>
      </div> 
    )}
    {role === "admin" && (
    <div className='w-full flex md:hidden items-center justify-between my-8'>
        <Link to={"/profile"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          All Orders
        </Link>
        <Link to={"/profile/orderHistory"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          Add Book
        </Link>
      </div> 
    )}
    </>
  )
}

export default MobileNav
