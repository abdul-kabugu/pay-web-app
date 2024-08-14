import { Code, Link, Plus } from "lucide-react";
import { Card, HoverEffect } from "../../ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { IconInvoice } from "@tabler/icons-react";




const CreateLink  =  ()  =>  {
    return(
         <div  className="w-full p-4 h-56  relative">
              <Link   className="text-muted-foreground m-5" />
                <div>
                     <h1  className="font-bold text-xl mb-3">Create payment link</h1>

              <h2>Recieve crypto payment for  anything.</h2>
                </div>

                 <div  className="absolute bottom-1">
                      <Button  variant={"ghost"} className="flex space-x-2 items-center">
                        <Plus className="w-4 h-4"  />
                        <p>Create</p>      
                    </Button>
                 </div>
             
         </div>
    )
}

const Integarte  =  ()  =>  {
    return(
         <div  className="w-full p-4 h-56  relative">
              <Code   className="text-muted-foreground m-5" />
                <div>
                     <h1  className="font-bold text-xl mb-3">Create payment link</h1>

              <h2>Recieve crypto payment for  anything.</h2>
                </div>

                 <div  className="absolute bottom-1">
                      <Button  variant={"ghost"} className="flex space-x-2 items-center">
                        <Plus className="w-4 h-4"  />
                        <p>Create</p>      
                    </Button>
                 </div>
             
         </div>
    )
}

const CreateInvoice  =  ()  =>  {
    return(
         <div  className="w-full p-4 h-56  relative">
              <IconInvoice   className="text-muted-foreground m-5" />
                <div>
                     <h1  className="font-bold text-xl mb-3">Create payment link</h1>

              <h2>Recieve crypto payment for  anything.</h2>
                </div>

                 <div  className="absolute bottom-1">
                      <Button  variant={"ghost"} className="flex space-x-2 items-center">
                        <Plus className="w-4 h-4"  />
                        <p>Create</p>      
                    </Button>
                 </div>
             
         </div>
    )
}

    const  Hello  =  ()  =>  {

        return(
            <div  className="h-52">proped</div>
        )
    }
export function TopCrads() {
  return (
    <div className="w-full mx-auto px-1">
  <HoverEffect    items={projects}  />
     
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://stripe.com",
    children : CreateLink()
    
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
    children : CreateInvoice()
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
    children : Integarte()
    
  },

];

