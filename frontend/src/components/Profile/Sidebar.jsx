import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../store/auth"

const Sidebar = ({ data }) => {
 const dispatch = useDispatch()
 const history = useNavigate();
 const role = useSelector((state) => state.auth.role)
  return (
    <div className='bg-zinc-700 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} alt="" className='h-[12vh] ' />
        <p className='mt-3 text-xl text-zince-100 font-semibold'>{data.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-300 hidden lg:block'></div>
      </div>

      {role === "user" && (
      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
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
      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to={"/profile"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
          All Orders
        </Link>
        <Link to={"/profile/add-book"} className='text-zinc-500 font-semibold w-full py-2 mt-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
         Add Book
        </Link>
      </div> 
      )}
      <button onClick={() =>{
        dispatch(authActions.logout())
        dispatch(authActions.changedRole("user"))
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("role")
        history("/")
      }} className='w-3/6 lg:w-full bg-zinc-800 p-1  mt-4 flex items-center justify-center gap-2 hover:bg-zinc-300 hover:text-zinc-800 rounded transition-all duration-300'>
        Log Out <MdLogout className='' />
      </button>
    </div>
  )
}

export default Sidebar
