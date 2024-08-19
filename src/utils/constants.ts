import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconHome,
   
  } from "@tabler/icons-react";
import { BadgeDollarSign , Link, House} from "lucide-react";




    export const  COUNTRIES  =   "1368|9UrBlZta7RyqMV9Nig0j2mSdeG6kI4vZ7K1SRRt1"


    export const HEDERA_MAINNET  = "https://mainnet.mirrornode.hedera.com/"
    export const HEDERA_TESTNET  = "https://testnet.mirrornode.hedera.com/"
    export const HEDERA_PREVIEW  = "https://preview.mirrornode.hedera.com/"
    export const  HEDERA_LOGO_URL = "https://pbs.twimg.com/profile_images/1657693585234337792/0Y5Y6bnW_400x400.jpg"


    export const WEBSITE_BASE_URL = "https://mainnet.mirrornode.hedera.com/"

 export  const navLinks = [
    {
      label: "Home",
      href: "/dashboard",
      icon:  House
    
    },
    {
      label: "Payments",
      href: "/payment",
      icon:  BadgeDollarSign
    },
    {
      label: "Payment links",
      href: "/payment/payment-links",
      icon: Link ,
    },
    {
      label: "Logout",
      href: "#",
      icon: IconArrowLeft 
    }
  ]


  export const invoicesTest = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]



