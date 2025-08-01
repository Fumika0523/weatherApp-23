"use client" // front end file
import Image from 'next/image'
import React from 'react'
import {FiMenu,FiX} from "react-icons/fi"
import { useState } from 'react'

const Header = () => {

  const [isOpen,setIsOpen] = useState(false)


  return (
    <header className="bg-[#456882] px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
            <Image src="/weather_logo.jpg" alt="Image logo" width={50} height={50} />
            <span className='text-white text-xl font-bold'>WeatherO</span>
        </div>
      <nav className='hidden md:flex space-x-6'>
        <a className='text-white text-xl hover:text-gray-200' href='#'>About Us</a>
        <a className='text-white text-xl hover:text-gray-200' href='#'>Contact Us</a>
      </nav>
  
      {/* Mobile Hamburger Menu */}

        <button className='md:hidden text-white text-2xl'
        onClick={()=>{
          setIsOpen(!isOpen)
        }}>
          {isOpen ? <FiX/> : <FiMenu/>}
        </button>
     </div>
      
      {
        isOpen && (
        <div className='md:hidden space-y-6 px-4'>
            <a className='block text-white text-xl hover:text-gray-200' href='#'>About Us</a>
            <a className='block text-white text-xl hover:text-gray-200' href='#'>Contact Us</a>
      </div>
        )
      }
    </header>
  )
}

export default Header