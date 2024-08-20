import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../switch-theme'

export default function Navbar() {
  return (
    <div  className=' w-full sticky top-0 bg-background border-b border-border h-[60px] mb-2  flex items-center justify-center z-40  px-4'>
     <div className='max-w-7xl mx-auto w-full flex items-center justify-between'>
        <div>LOGO</div>
         <div>
            <ModeToggle  />
            <Link href={`/login`} className='border p-2 rounded-xl'>
              Get started
            </Link>
         </div>
         </div>
      
    </div>
  )
}
