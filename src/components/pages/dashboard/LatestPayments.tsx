
"use client"
import React, {useState} from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { invoicesTest } from '@/utils/constants'



export default function LatestPayments() {
  const [selectedValue, setselectedValue] = useState("")
  return (
    <div  className='w-full px-1'>
       <div className='w-full flex justify-between my-4'>
         <h1 className='font-bold text-xl'>Recent payments</h1>

         <Select onValueChange={(e)  => setselectedValue(e)}  >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="All type" />
  </SelectTrigger>
  <SelectContent className='border-accent'>
    <SelectItem value="one-time">One time</SelectItem>
    <SelectItem value="subscriptions">Subscptions</SelectItem>
  
  </SelectContent>
</Select>
       </div>

      <div>
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoicesTest.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        
        
        </div>   



    </div>
  )
}
