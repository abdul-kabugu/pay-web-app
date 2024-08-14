"use client"

import { Button } from '@/components/ui/button'
import { Link as LinkIcon , Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { TopCrads } from './TopCards'
import LatestPayments from './LatestPayments'
import { IconInvoice } from '@tabler/icons-react'


 
export default function Home() {
  return (
    <div  className='w-full'>
          <div  className=' justify-between   items-center  my-5  hidden md:flex'>
             <h2  className='text-xl  font-semibold'>Today</h2>
            

              <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button  variant={"secondary"}   className='bg-blue-500  text-white flex items-center space-x-2'>
                <Plus  className='w-4 h-4' />
 <p className='text-sm'>Create payment</p>
                   </Button>
     
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem >
          <Link href={`/payment-links/create`} className='p-2 hover:bg-muted flex space-x-2 max-w-56'>
               <LinkIcon className='w-6 h-6' />

                <div>
                   <h1  className='font-semibold '>Payment link</h1>
                    <p  className='text-muted-foreground text-sm'>Accapte pne-time or recurring payment from anyone</p>
                </div>

          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
        <Link href={`/invoices/create`} className='p-2 hover:bg-muted flex space-x-2 max-w-56'>
               <IconInvoice className='w-6 h-6' />

                <div>
                   <h1  className='font-semibold '>Payment link</h1>
                    <p  className='text-muted-foreground text-sm'>Accapte pne-time or recurring payment from anyone</p>
                </div>

          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>


           <div>
             <TopCrads   />
           </div>

            <LatestPayments  />
    </div>
  )
}
