"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, Bolt, Building2, HandCoins, Laugh, LayoutDashboard, PencilRuler } from "lucide-react";
import { navLinks } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { checkFreeCredits, getProfile } from "@/lib/functions";
import { useUser, SignedIn } from "@clerk/nextjs";
import { useCreditStore } from "@/hooks/free-credit";


const DashboardPage = () => {
  const user = useUser();
  const [apiLimitCount, setApiLimitCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const setFreeCredit = useCreditStore(state => state.setFreeCredit);

  React.useEffect(() => {
    if (user && profile === null) {
      (async function fetchProfile() {
        const profileData = await getProfile()
        setProfile(profileData)
  
        //update the free credit store
        useCreditStore.setState({ freeCredit: profileData.freeCredit })
      })()
    }
  }, [])
  

  const router = useRouter()

  const getIcon = (iconName : string) => {
    switch (iconName) {
        case 'dashboard':
            return <LayoutDashboard className='text-sky-500'/>
        case 'interior':
            return <Bolt className='text-pink-600' />
        case 'exterior':
            return <Building2 className='text-violet-500' />
        case 'profile':
            return <Laugh className='text-orange-700' />
        case 'buy':
            return <HandCoins className='text-yellow-400'/>
        case 'sketch':
            return <PencilRuler className='text-green-500'/>
        default:
            return null;
    }
}
  return (
  <section className="mt-10 px-4">
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">Welcome to Your Dashboard</h2>
    </div>
    <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-10">
      Render with the power of AI. Get started by uploading your images and let us do the rest.
    </p>
    <div className="px-4 md:px-20 lg:px-32 space-y-4 mt-20"> 
      {navLinks.slice(0, 3).map((link, index) => (
        <Card 
          key={index} 
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          onClick={() => router.push(link.route)}
          >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md ")}>
              <div className="flex-center w-10 h-10 bg-gray-200 rounded-md">
                {getIcon(link.icon)}
              </div>
            </div>
            <div className="font-semibod">
              {link.label}
            </div>
          </div>
            <ArrowRight className="text-gray-500 w-5 h-5"/>

        </Card>
      ))}
    </div>
  </section>
  )

}

export default DashboardPage;
