"use client"
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user}= useUser();
    return (
    <div className='p-5 bg-black w-full text-white rounded-lg flex items-center gap-6'>
      <Image src={'/book3.jpg'} alt='book' width={80} height={80} /> 
      <div> 
        <h2 className= 'font-bold text-3xl'> Hello, {user?.fullName}</h2>
        <p> Welcome back, It's a beautiful day to learn. Start a new course or continue your journey with an existing course!</p>
      </div>
    </div>
  )
}

export default WelcomeBanner
