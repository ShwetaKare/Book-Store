import React from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
        {
            title: "AdminProfile",
            link: "/profile"
        }
    ]
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role =  useSelector((state) => state.auth.role);
    if (isLoggedIn === false) {
        links.splice(2, 3)
    }
    if(isLoggedIn === true && role === "user"){
        links.splice(4,1)
    }
    if(isLoggedIn === true && role === "admin"){
        links.splice(3,1)
    }
    const [MobileNav, setMobileNav] = useState("hidden")
    return (
        <>
            <nav className='z-50 relative bg-zinc-800 text-white flex items-center justify-between px-8 py-4 cursor-pointer'>
                <Link to={"/"} className='flex gap-1 items-center'>
                    <img className='h-12 rounded-full' src="https://as2.ftcdn.net/v2/jpg/09/36/87/75/1000_F_936877540_WlWeEdFKTtxw7jbtUr8ysUYv7aGqaIwg.jpg" alt="logo" />
                    <h1 className='text-2xl font-semibold'>Novella</h1>
                </Link>
                <div className='block md:flex gap-4 items-center'>
                    <div className='hidden md:flex gap-4 '>
                        {links.map((items, i) =>
                            <div className='flex items-center'>
                            {items.title === "Profile" || items.title === "AdminProfile" ? (
                                <Link to={items.link} key={i} className='px-2 py-1 border items-center border-blue-600 rounded-lg text-white hover:bg-white hover:border-black hover:text-black transition-all duration-300'>
                                {items.title}
                            </Link>
                            ) : (
                                <Link to={items.link} key={i} className='hover:text-blue-700 transition-all duration-200'>
                                {items.title}
                            </Link>
                            )}
                            </div>)}
                    </div>
                    {isLoggedIn === false && (
                        <div className='hidden md:flex gap-4'>
                            <Link to={"/login"} className='px-2 py-1 border border-blue-600 rounded-lg text-white hover:bg-white hover:border-black hover:text-black transition-all duration-300'>Login</Link>
                            <Link to={"/signup"} className='px-2 py-1 bg-blue-700 rounded-lg text-white  hover:bg-white hover:border-black hover:text-black transition-all duration-300'>Sign Up</Link>
                        </div>
                    )}
                    <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}><IoMenu /></button>
                </div>
            </nav>
            <div className={`${MobileNav} bg-zinc-700 h-screen top-0 left-0 absolute w-full z-40 mt-2 flex flex-col items-center justify-center`}>
                {links.map((items, i) => <Link to={items.link} key={i} onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))} className={`${MobileNav} m-2 hover:text-blue-700 transition-all duration-200 text-xl font-bold text-white`}>{items.title}</Link>)}
                {isLoggedIn === false && (
                    <>
                        <Link to={"/login"} className={`${MobileNav} m-2 px-3 py-2 border border-blue-600 rounded-lg text-white hover:bg-white hover:border-black hover:text-black transition-all duration-30  text-xl font-bold `}>Login</Link>
                        <Link to={"/signup"} className={`${MobileNav} m-2 px-3 py-2 bg-blue-700 rounded-lg text-white  hover:bg-white hover:border-black hover:text-black transition-all duration-300  text-xl font-bold `}>Sign Up</Link>
                    </>
                )}
            </div>

        </>
    )
}

export default Navbar
