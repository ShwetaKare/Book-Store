import React from 'react'
import bookImage from "../../assets/book.avif";
import { Link } from 'react-router-dom';
 // Adjust the path based on your folder structure

const Hero = () => {
    return (
        <div className='h-[75vh] flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10 px-5'>
            {/* Text Section */}
            <div className='w-full md:w-5/6 lg:w-3/6 flex flex-col items-center md:items-start text-center md:text-left'>
                <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold text-yellow-100'>
                    Discover Your Next Great Read
                </h1>
                <p className='mt-4 md:mt-6 text-base md:text-xl text-zinc-300'>
                    Whether it's a gripping novel, an informative guide, or a thought-provoking biography,
                    each book enriches the reader's perspective and fuels curiosity.
                </p>
                <div className='mt-5 md:mt-7'>
                    <Link to={"/all-books"} className='bg-zinc-300 font-semibold text-black text-md md:text-lg lg:text-2xl rounded-full px-6 py-2'>
                        Discover Books
                    </Link>
                </div>
            </div>

            {/* Image Section */}
            <div className='flex items-center justify-center'>
                <img 
                    src={bookImage} 
                    className='h-40 w-40 md:h-72 md:w-72 lg:h-96 lg:w-96 object-cover' 
                    alt="Books stack" 
                />
            </div>
        </div>
    )
}

export default Hero
