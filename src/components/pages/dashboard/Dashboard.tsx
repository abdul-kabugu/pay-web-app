import React from 'react'
import { AppSidebar } from './Sidebar'
import { ModeToggle } from '@/components/switch-theme'
import Navbar from './Navbar'
import SideBar2 from './Sidebar2'
import Home from './Home'

export default function Dashboard() {
  return (
    <div  className='w-full  '>
        <Navbar   />
           
      <div  className=' w-full max-w-[1600px]   min-h-screen  flex space-x-3    mx-auto'>
     <SideBar2  />
      <Home  />

      </div>
     
   
    </div>
  )
}
