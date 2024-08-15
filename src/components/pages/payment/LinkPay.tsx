"use client"

import { ModeToggle } from '@/components/switch-theme'
import { usePathname , useParams,  useRouter} from 'next/navigation'
import React, {useState, useEffect} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,r,
} from '@tanstack/react-query'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  amount: z.coerce.number(),
  network : z.string(),
    coin : z.string()
 })

export default function LinkPay() {
  const pathName = usePathname()
  const params =  useParams()
  const  router =  useRouter()

     const  PAY_BASE_URL = `http://localhost:5000/pay/`

  const handleFetchLink  =   async ()  =>  {
    const res  =  await  axios.get(`${PAY_BASE_URL}link/${linkId}`)
     return res.data
  }

    const {data, isPending, isError, isSuccess, isLoading, error}  = useQuery({
     queryKey : ['linkData'],
     queryFn : handleFetchLink
    })

    const linkId = params.linkId

   console.log("path name ",params.linkId)

      const  generateCheckouSession =  async (linkId : string)  =>   {
         const sessionId =   await axios.post(`${PAY_BASE_URL}create-session/${linkId}`,  {amount : 20})
           return  sessionId
      }

    const pushToChckOut =   async ()  =>  {
        const  id =  await generateCheckouSession(linkId)
         if(id.status  === 200){
     router.push(`/payment/checkout-session/${id.data.sessionId}`)
         }
     

    }

   useEffect(() => {

    if(isSuccess && data  &&  data.paymentType === "fixed"){
      pushToChckOut()
       
    }
    
  
  }, [data, isSuccess])


 

        // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
      amount : 1,
      coin :  "HBAR",
      network : "hedera"
      
     },
   })
 


 
   // 2. Define a submit handler.
   const onSubmit  =  async (values: z.infer<typeof formSchema>)=>{
 
     try {
       const  res  = await  axios.post(`${PAY_BASE_URL}session/${linkId}`,  values)
          toast({
           title  : "New ;onk created",
           description :  "Youve  succefully created new payment link"
          })
 
            console.log(res.status)
       
     } catch (error) {
        console.log("error", error)
        toast({
         title : "something went wrong",
         description  : "something went wrong check consol"
        })
       
     }
       
 
         
     console.log("the value", values)
    
   }


  


          if(error){
            return(
              <div className='w-full h-screen flex items-center justify-center'>

                <p>howdy  something  went  wrong</p>
              </div>
            )
          }

          if(isLoading){
            return(
              <div className='w-full h-screen flex items-center justify-center'>

                <p>howdy  still loading</p>
              </div>
            )
          }

        
          
  return (
    <div  className='w-[450px]   bg-background rounded-3xl p-5'>
      <ModeToggle  />
    
    
     <div  className='p-6 my-2'>
        <h1  className='font-semibold  text-xl text-center my-3'>Link title</h1>
         <h2 className='text-muted-foreground  text-lg  text-center'>Link description</h2>
     </div  >

      <div  className=' dark:bg-background  pt-5  p-3 rounded-t-3xl'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <div>
          <FormField
          control={form.control}
          name="network"
          render={({ field }) => (

            <FormItem className='my-4'>
                <FormLabel>Network</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}  >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hedera" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hedera">Hedera</SelectItem>
                </SelectContent>
              </Select>
                 
            </FormItem>

            
                       )}/>

<FormField
          control={form.control}
          name="coin"
          render={({ field }) => (

            <FormItem className='my-4'>
                <FormLabel>Coin</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}  >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hbar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hbar">Hbar</SelectItem>
                </SelectContent>
              </Select>
                 
            </FormItem>

            
                       )}/>
          </div>
        <FormField
          control={form.control}
          name="amount"
            rules={{
              required : false
            }}
          render={({ field }) => (
            
                 <FormItem  className='my-4'>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>      )}/> 
            <Button type="submit" className='w-full' >Continue to pay</Button>

</form>
</Form>
          

      </div>

      <Button type="submit" className='w-full'  onClick={  ()  =>  printId()} >Continue to pay</Button>
    </div>
  )
}
