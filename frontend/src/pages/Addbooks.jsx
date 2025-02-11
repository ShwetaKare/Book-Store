import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Addbooks = () => {
    const [Data, setData] = useState({
        url : "",
        title:"",
        author:"",
        price:"",
        description:"",
        language:""
    })
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      }

    const change = (e) =>{
        const { name , value } = e.target
        setData({...Data, [name] : value});
    }
    const submit = async () =>{
        try{
            if(
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.language === "" ||
                Data.description === "" ||
                Data.price === "" 
            ){
                alert("All fields are required")
            }else{              
               const response = await axios.post("http://localhost:1000/api/v1/add-book", Data , {headers})
                setData({
                    url : "",
                    title:"",
                    author:"",
                    price:"",
                    description:"",
                    language:""
                })
                alert(response.data.message)
            }
        }catch(error){
            alert(error.response.data.message)
        }
    }
  return (
    <div className='p-0 md:p-4 h-screen'>
       <h1 className='text-3xl md:text-5xl font-semibold text-zinc-200 mb-8'>Add Book</h1>
       <div className='p-4 bg-zinc-700 rounded'>
        <div>
            <label htmlFor="">Image</label>
            <input type='text' placeholder='url of image' name='url' value={Data.url} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' required/>
        </div>
        <div className='mt-4'>
            <label htmlFor="" className='text-zinc-200'>Title of Book</label>
            <input type='text' placeholder='Enter title' name='title' value={Data.title} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' required/>
        </div>
        <div className='mt-4'>
            <label htmlFor="">Author of Book</label>
            <input type='text' placeholder='Enter author' name='author' value={Data.author} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' required/>
        </div >
        <div className='mt-4 flex gap-4'>
        <div className='w-3/6'>
            <label htmlFor="">Language</label>
            <input type='text' placeholder='Enter language' name='language' value={Data.language} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' required/>
        </div>
        <div className='w-3/6'>
            <label htmlFor="">Price</label>
            <input type='text' placeholder='Enter price' name='price' value={Data.price} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' required/>
        </div>
        </div>
        <div className='mt-4'>
            <label htmlFor="">Description of Book</label>
            <input type='text' placeholder='Enter description' name='description' value={Data.description} onChange={change} 
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-none' rows="5" required/>
        </div>
        <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded
         hover:bg-blue-600 transition-all duration-300' onClick={submit}>
            Add Book
        </button>
        
       </div>
    </div>
  )
}

export default Addbooks
