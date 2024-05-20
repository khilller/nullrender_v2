"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Bolt, Building2, HandCoins, Laugh, LayoutDashboard, PencilRuler } from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Sidebar from './Sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { ScrollArea } from "@/components/ui/scroll-area"


interface SidebarProps {
    apiLimitCount: number
}
  

const MobileNav = ({apiLimitCount=0}: SidebarProps) => {
    const pathname = usePathname()

    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

  return (
    <header className='header'>
        <Link href='/' className='flex items-center gap-2 md:py-2'>
            <Image
                src='/assets/images/logo-black.svg'
                alt='logo'
                width={180}
                height={180}
            ></Image>
        </Link>
        <nav className='flex gap-2 overflow-y-auto'>
            <SignedIn>
                <UserButton afterSignOutUrl='/' />
                <Sheet>
                    <SheetTrigger>
                        <Menu size={24} strokeWidth={2.5} className='cursor-pointer'/>
                    </SheetTrigger>
                    <SheetContent className='p-0 border-none'>

                            <Sidebar apiLimitCount={apiLimitCount}/>
                            

                    </SheetContent>
                </Sheet>


            </SignedIn>
            <SignedOut>
                <Button className='button'>
                    <Link href="/sign-in">
                        Login
                    </Link>
                </Button>
            </SignedOut>
        </nav>
    </header>
  )
}

export default MobileNav