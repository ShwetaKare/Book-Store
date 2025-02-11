import React from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
  // const isLoggedIn=  useSelector()
  const [Profile, setProfile] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers })
      setProfile(response.data)
    }
    fetch()
  }, [])

  return (
    <div className='bg-zinc-800 px-2 md:px-12 flex flex-col md:flex-row  py-8 text-white'>
      {!Profile && <p className='w-full h-[100%] flex items-center justify-center'>Loading...</p>}
      {Profile && (
        <>
          <div className='w-full md:w-1/6 '>
            <Sidebar data={Profile} />
            <MobileNav />
          </div>
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
