import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

function DashboardHeader() {
  return (
    <div className='p-5 shadow-md flex justify-end'>
     <div className='flex items-center gap-4'>
    <Image 
      className='cursor-pointer' 
      src="/mindmorph.svg" 
      alt="logo" 
      width={150} 
      height={150} 
    />
    <Link href="/dashboard">
    <button className='bg-black text-white px-4 py-2 rounded hover:bg-black transition'>
  Dashboard
</button>
    </Link>
    <UserButton />
    </div>
    </div>
  )
}

export default DashboardHeader
