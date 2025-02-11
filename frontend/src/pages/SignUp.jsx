import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

const SignUp = () => {

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  })

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are required")
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up", Values)
        alert(response.data.message)
        navigate("/Login")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }


  return (
    <div className='bg-zinc-900 mx-auto px-12 py-12 flex justify-center items-center'>
      <div className='bg-zinc-800 w-auto px-20 py-5 items-center justify-center'>
        <div className='items-center justify-center mb-2'>
          <h1 className='text-2xl font-bold text-left text-zinc-500'>Sign Up</h1>
        </div>
        <div className='flex items-center justify-center'>
          <form action="" className=''>
            <div className='mt-3'>
              <label htmlFor="" className='block p-1 text-zinc-500'>UserName</label>
              <input value={Values.username} onChange={change} type="text" className='rounded-lg text-zinc-500 bg-zinc-900 w-full m-1 p-2' name="username" id="" placeholder='Enter Username' required />
            </div>
            <div className='mt-2'>
              <label htmlFor="" className='block p-1 text-zinc-500'>Email</label>
              <input value={Values.email} onChange={change} type="abc@gmail.com" className='rounded-lg text-zinc-500 bg-zinc-900  w-full m-1 p-2' name="email" id="" placeholder='Enter Email' required />
            </div>
            <div className='mt-2'>
              <label htmlFor="" className='block p-1 text-zinc-500'>Password</label>
              <input value={Values.password} onChange={change} type="text" className='rounded-lg text-zinc-500 bg-zinc-900 w-full m-1 p-2' name="password" id="" placeholder='Enter Password' required />
            </div>
            <div className='mt-2'>
              <label htmlFor="" className='block p-1 text-zinc-500'>Address</label>
              <input value={Values.address} onChange={change} type="text" className='rounded-lg text-zinc-500 bg-zinc-900 w-full m-1 p-2 pb-20 ' name="address" id="" placeholder='Enter Address' required />
            </div>
            <div className='justify-center mt-4 items-center text-center rounded-lg p-2 text-white bg-blue-700  hover:bg-white hover:text-blue-600 transition-all duration-300 '>
              <button onClick={submit} className=' text-center font-semibold text-xl'>Sign Up</button>
            </div>
            <p className='text-center mt-2 text-zinc-500'>Or</p>
            <div className='text-zinc-500 mt-2 text-xl'>
              <p>Already have an account? <Link to={"/login"} className='text-white hover:text-blue-600'>login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
