import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
const Settings = () => {
  const [Value, setValue] = useState({address :""})
  const [profiledata, setprofiledata] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers })
      setprofiledata(response.data)
      setValue({address:response.data.address})
    }
    fetch()
  }, [])

  const change = (e) =>{
    
    const {name , value} = e.target
    setValue({...Value, [name] : value})
  }

  const submitaddress = async () =>{
    const response = await axios.put("http://localhost:1000/api/v1/update-address" , Value , {headers})
    // setprofiledata(response.data.data)
    alert(response.data.message)
  }
  return (
  <div className='h-screen'>
  {!profiledata && (
    <div>Loading...</div>
  )}
  {profiledata && (
    <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-6'>Settings</h1>
      <div className='flex gap-12'>
        <div className=''>
          <label htmlFor="">Username</label>
          <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profiledata.username}</p>
        </div>
        <div className=''>
          <label htmlFor="">Email</label>
          <p className='p-2 rounded bg-zinc-600 mt-2 font-semibold'>{profiledata.email}</p>
        </div>
      </div>
      <div className='mt-4 flex flex-col'>
        <label htmlFor="">Address</label>
        <textarea className='p-2 rounded bg-zinc-600 mt-2 font-semibold' rows={5} placeholder='Address' name="address" onChange={change} value={Value.address} id="" />
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={submitaddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'>
          Update
        </button>
      </div>
    </div>
  )}
  </div>
  )
}

export default Settings
