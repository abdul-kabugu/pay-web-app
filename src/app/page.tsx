//@ts-nocheck


"use client"
import Auth from "@/components/Auth";
import axios from "axios";
import io from 'socket.io-client';
import {Hbar, HbarUnit}  from '@hashgraph/sdk'

import { useState , useEffect, useCallback} from "react";

export default function Home() {
  const [sessionId, setsessionId] = useState()

  const [status, setStatus] = useState('pending');




// 10 HBAR
new Hbar(10);


  console.log("the hbar amont",  Hbar.from("1", HbarUnit.Tinybar))


  const  payBaseUrl = `http://localhost:5000/pay/`
    const handleGenerateSession =  async ()  =>  {
         try {
           const  result = await   axios.post(`${payBaseUrl}session/6f1f7bc8-1d4b-43ce-b9c8-1aa3cd67a11b`)
                         setsessionId(result?.data?.sessionId)
             console.log("the result", result)
         } catch (error) {

             alert(error)
          
         }
    }


      const  handleTest =  async ()   =>  {
        try {
            const res  =   await   axios.get("https://testnet.mirrornode.hedera.com/api/v1/transactions/0.0.4667147-1723377005-308159973")

              console.log("reslts", res)
        } catch (error) {
              console.log(error)
              console.log("result number", error.response.status )
          
        }
      }


         const  theId = "0.0.4667147@1723377005.308159973"

    const handlePay =  async ()  =>  {
      try {
        const  result = await   axios.post(`${payBaseUrl}check-out/f2eafc04-4f39-4a1f-acfa-04602fdd4253`, {
          amount : 10,
          transactionHash : "0.0.4667147-1723377005-30815997",
         
        })
                      setsessionId(result.data)
          console.log("the result", result)
      } catch (error) {

          alert(error)

          console.log("the  error", error)
       
      }
 }

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

 

  const handleMessageBE = async () => {
    socket.emit("message", {
      text: "hello world"
    });
    console.log("Message sent to the backend");
  };

  const handleStatus = async () => {
    socket.emit("paymentStatus", "failed");
    console.log("Payment status updated to failed");
  };






  return (
    <main className="flex min-h-screen flex-col">
     <h1>HBER TESTING</h1>

     <button  className="p-4 bg-red-400"  onClick={()  => handleGenerateSession()}>generate session</button>
     <button  className="p-4 bg-red-400"  onClick={()  => handlePay()}>pay session</button>
     <button  className="p-4 bg-red-400"  onClick={()  => handleMessageBE()}>send message </button>
     <button  className="p-4 bg-red-400"  onClick={()  => handleStatus()}>update status </button>
     <button  className="p-4 bg-red-400"  onClick={()  => handleTest()}>test  funcs </button>

<h1>{theId.replace('@', '-').replace(/\./g, '-')}</h1>

  
    

      
      <Auth  />
    </main>
  );
}
