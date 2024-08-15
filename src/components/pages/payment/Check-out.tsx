
"use client"
import { ModeToggle } from '@/components/switch-theme'
import React, {useState, useEffect} from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,r,
  } from '@tanstack/react-query'
  import io from 'socket.io-client';
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    
  } from "@/components/ui/form"
  import { useQRCode } from 'next-qrcode'

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Input } from "@/components/ui/input"
  import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { Loader2, LoaderPinwheel, MessageCircleWarningIcon, QrCode, TimerIcon, Wallet } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Magic } from 'magic-sdk';
import { HederaExtension } from '@magic-ext/hedera';
import { AccountId, TransferTransaction } from '@hashgraph/sdk';


import { MagicWallet,  } from '@/utils/magicWallet';
import { MagicProvider } from '@/utils/magicProvider';



const magic = new Magic('pk_live_C8037E2E6520BBDF', {
  extensions: [
    new HederaExtension({
      network: 'testnet',
    }),
  ],
});


const formSchema = z.object({
    payerEmail: z.string(),
    payerName : z.string(),
      payerAddress : z.string()
   })
export default function CheckOut() {
    const [txHash, settxHash] = useState("")
    const [isUser, setisUser] = useState(false)
    const [userMetadata, setUserMetadata] = useState({});
    const [sendingTransaction, setSendingTransaction] = useState(false);
    const [email, setemail] = useState("")
    const [publicAddress, setPublicAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [status, setStatus] = useState('pending');
    const [sendAmount, setSendAmount] = useState(0);
const params =  useParams()
    const  router =  useRouter()
    const sessionId = params.sessionId
  const  PAY_BASE_URL = `http://localhost:5000/pay/`
  const { Canvas } = useQRCode();

  
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
             payerEmail : "",
             payerName :  "",
             payerAddress : "hedera"
             
            },
          })
        

              // Initialize socket only once using useEffect
  const socket = io('http://localhost:5000', { autoConnect: false });

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on('paymentStatus', (newStatus) => {
      console.log("The payment status:", newStatus);
      //alert("changed")
      setStatus(newStatus);
    });

    return () => {
      socket.disconnect();
    };
  }, [])


            //  FETCH  USER  WALLET  INFORMATION

            useEffect(() => {
                magic.user.isLoggedIn().then(async magicIsLoggedIn => {
                  setisUser(magicIsLoggedIn);
                  if (magicIsLoggedIn) {
                    const publicAddress = (await magic.user.getMetadata()).publicAddress;
                    setPublicAddress(publicAddress);
                    setUserMetadata(await magic.user.getMetadata());
                  }
                });

                  console.log("Im invoked")
              }, [isUser]);


                //  HANDLE  ON-CHAIN -LOGIN

                const login = async () => {
                    await magic.auth.loginWithEmailOTP({ email });
                    setisUser(true);
                  };

                   // HANDLE ONCHAIN LOG OUT

                   const logout = async () => {
                    await magic.user.logout();
                    setisUser(false);
                  };

                     // RECIEVER  TESTER

                     const  RECIEVER_TEST = "0.0.4660084"
                     const SEND_AMOUNT_TEST  = 1

                   //  HANDLE  HEDERA  TRANSAFER TOKENS

                   const handleTransfer = async () => {
                    try {
                        const { publicKeyDer } = await magic.hedera.getPublicKey();
                
                        const magicSign = message => magic.hedera.sign(message);
                        const magicWallet = new MagicWallet(publicAddress, new MagicProvider('testnet'), publicKeyDer, magicSign);
                      
                        let transaction = await new TransferTransaction()
                          .setNodeAccountIds([new AccountId(3)])
                          .addHbarTransfer(publicAddress, -1 * SEND_AMOUNT_TEST)
                          .addHbarTransfer(RECIEVER_TEST, SEND_AMOUNT_TEST)
                          .freezeWithSigner(magicWallet);
                    
                        transaction = await transaction.signWithSigner(magicWallet);
                        const result = await transaction.executeWithSigner(magicWallet);
                        const receipt = await result.getReceiptWithSigner(magicWallet);
                    
                    
                          console.log("transaction reciepet", receipt)
                    
                          console.log("tx result", result)
                    
                        setSendingTransaction(true);
                    
                        console.log(receipt.status.toString());
                        console.log("tx id",result.transactionId.toString());

                          return  result.transactionId.toString()
                      }
                        
                     catch (error) {
                           alert("transaction part went wrong")
                           console.log("transaction part error", error)
                    }}
                  

                      const  handlePay = async ()  =>  {
                         const  txHash  = await  handleTransfer()
                         console.log("howdy we got tx", txHash)
                      }


                console.log("on-chain user data", userMetadata)
       
       
        
          // 2. Define a submit handler.
          const onSubmit  =  async (values: z.infer<typeof formSchema>)=>{
             const txHash =  await  handleTransfer()
            const valueData =  {
                 payerEmail : values.payerEmail,
                 payerName : values.payerName,
                 payerAddress : values.payerAddress,
                 transactionHash : txHash
            }
        
            try {
              const  res  = await  axios.post(`${PAY_BASE_URL}check-out/${sessionId}`,  valueData)
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
  
    const handleFetchSession  =   async ()  =>  {
      const res  =  await  axios.get(`${PAY_BASE_URL}session/${sessionId}`)
       return res.data
    }
  
      const {data, isPending, isError, isSuccess, isLoading, error}  = useQuery({
       queryKey : ['sessionData'],
       queryFn : handleFetchSession
      })
  console.log("information", data)

  
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
    <div className=' max-w-5xl mx-auto    my-4'>
        <ModeToggle  />
        <div  className='flex flex-col md:flex-row lg:space-x-1 '>
          <div  className='flex-1  md:h-screen border-b md:border-b-0  border-r    p-6  '>
              <h1  className=' font-bold'>Pay :  <span  className='text-SM font-semibold'>reciever name</span></h1>

               <div  className='my-5'>
                 <h1  className='text-xl  font-semibold my-2'>Payment link name</h1>
                  <h2  className='text-muted-foreground'>Payment description</h2>
               </div>

                 <div  className='my-5  h-[1.5px]  bg-muted'></div>

                  <div>
                     <p>20  USD</p>
                  </div>
          </div>
          <div  className='flex-1   md:h-screen    p-6  '>
   <div  className='flex  justify-between items-center  my-4 mb-6'>
      <h1  className='font-semibold  text-sm lg:text-xl'>{data?.reciever?.collectEmail ||  data?.reciever?.collectAddreess ||  data?.reciever?.collectName  ?  "Fill  in the  details"   :  "Pay with"}</h1>
        <div  className='inline-flex  py-1 md:py-1.5 px-2 md:px-3 rounded-xl items-center justify-center  space-x-1  bg-muted'>
              <TimerIcon  className='w-3 h-3 lg:w-4 lg:h-4' />   <p  className='text-muted-foreground text-sm'>Pay within  1.10 min</p>
          
        </div>
   </div>

  
   {data?.reciever?.collectEmail ||  
     data?.reciever?.collectName  ||
     data?.reciever?.collectAddress ?
   
     (
      <div>
        
        <h1 className='font-semibold text-sm lg:text-lg '>Contact  information</h1>

         

         <div> 
            
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {  data?.reciever?.collectName  &&
        <FormField
          control={form.control}
          name="payerName"
            rules={{
              required : false
            }}
          render={({ field }) => (
            
                 <FormItem  className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder="charity donation.." {...field} disabled={! isUser} />
              </FormControl>
              <FormMessage />
            </FormItem>      )}/> 

          }

{  data?.reciever?.collectEmail
  &&
        <FormField
          control={form.control}
          name="payerEmail"
            rules={{
              required : false
            }}
          render={({ field }) => (
            
                 <FormItem  className='my-2'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  type='email' placeholder="charity donation.." {...field} disabled={! isUser} />
              </FormControl>
              <FormMessage />
            </FormItem>      )}/> 

          }

{  data?.reciever?.collectAddress  &&
        <FormField
          control={form.control}
          name="payerAddress"
            rules={{
              required : false
            }}
          render={({ field }) => (
            
                 <FormItem  className='my-2'>
              <FormLabel>Billing  address</FormLabel>
              <FormControl>
                <Input placeholder="charity donation.." {...field} disabled={! isUser} />
              </FormControl>
              <FormMessage />
            </FormItem>      )}/> 

          }


<div  className='mt-4'>
     <p className='font-semibold'>Continue with your preferred payment method</p>
</div>
 
   <Accordion type="single" collapsible className="w-full">
   <AccordionItem value="item-1">
     <AccordionTrigger>
         <div  className='flex items-center space-x-2'>
             <Wallet className='w-5 h-5'  />
             <p>Wallet</p>
         </div>
     </AccordionTrigger>
     <AccordionContent>
     <div>
        {isUser  ?  (
           <Button type="submit" className={`w-full ${! isUser && "hidden"}`} >Continue to pay</Button>  
        )  :  (
            <div  className='space-y-2'>
            <Input type='email'  value={email}  onChange={(e)  =>  setemail(e.target.value)} placeholder='example@gmail.com'  />
            <p>{email}</p>
             <Button  className={`w-full `}>Continue with email</Button>
            </div>
        )}
     </div>
     </AccordionContent>
   </AccordionItem>
   <AccordionItem value="item-2">
     <AccordionTrigger>
        <div  className='flex items-center space-x-2'><QrCode className='w-5 h-5'  />
        <p>Scan QR  code</p>
         </div>
     </AccordionTrigger>
     <AccordionContent className='flex  items-center justify-center  '>
        <div  className='my-4  flex  items-center justify-center  flex-col'>
            <div  className=''>
     <Canvas
      text='https://github.com/Bunlong/next-qrcode'
      options={{
        errorCorrectionLevel: 'M',
        margin: 2,
        scale: 20,
        width: 190,
        color: {
            dark: '#2563eb',
            light: '#f8fafc',
          },
      }}
      logo={{
        src: 'https://pbs.twimg.com/profile_images/1710222001221087234/fGB9FHod_400x400.jpg',
        options: {
          width: 35,
          x: undefined,
          y: undefined,
          
        }
      }}
    />
</div>

  <div  className='border  p-3 mt-3 rounded-xl'>
      <div  className='my-4 '>
         <h1  className='font-semibold text-sm  lg:text-lg mb-1'>{`Send USDC  on polygon network`}</h1>
          <div className='flex items-center  space-x-1'>
             <MessageCircleWarningIcon  className='w-3 h-3 text-muted-foreground'  />
              <p  className='text-xs  text-muted-foreground'>Sending funds on the wrong network or token leads to fund loss.</p>
          </div>
      </div>
      <Button disabled  className='w-full '>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Checking payment status..
    </Button>
  </div>
</div>
      
     </AccordionContent>
   </AccordionItem>
  
 </Accordion>
  
  

        
            
            </form>
            </Form>
             </div>


        
  </div>
   )  :  ""}
          </div>
          </div>

       <h1>{status}</h1>
          <p>{publicAddress}</p>
    </div>
  )
}
