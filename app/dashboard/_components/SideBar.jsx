"use client"
import { Button } from '@/components/ui/button'
import { LayoutDashboard, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideBar() {
    
    const MenuList=[
        {
            name:'Dashboard', 
            icon:LayoutDashboard,
            path:'/dashboard'

        }, 
        {
            name:'Profile', 
            icon:UserCircle,
            path:'/dashboard/profile'

        }, 


    ]
    const path= usePathname();
    return (
    <div className = 'h-screen shadow-md'>
      <div> 

        <Image src={'/mindmorph.svg'} alt='logo' width={1000} height={1000}/>

      </div>
      <div className = 'mt-10'> 
        <Link href ={'/create'} className="w-full">
        <Button className = "w-full"> + Create New</Button>
        </Link>
      </div>
      <div className = 'mt-5'> 
        {MenuList.map((menu, index)=>(
            <div key={index} className = {`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3
            
            ${path==menu.path&&'bg-slate-200'}`}> 
            <menu.icon/>
            <h2>{menu.name}</h2>
            </div> 
        
        ))}
      </div>
    </div>
  )
}

export default SideBar
