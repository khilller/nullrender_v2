"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Bolt, Building2, HandCoins, Laugh, LayoutDashboard } from 'lucide-react'

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
  

const MobileNav = () => {
    const pathname = usePathname()

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
            default:
                return null;
        }
    }
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
        <nav className='flex gap-2'>
            <SignedIn>

                <Sheet>
                    <SheetTrigger>
                        <Menu size={24} strokeWidth={2.5} className='cursor-pointer'/>
                    </SheetTrigger>
                    <SheetContent>
                        <>
                            <Image
                                src='/assets/images/logo-black.svg'
                                alt='logo'
                                width={180}
                                height={180}
                            />

                            <ul>
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.route

                                    return (
                                        <li 
                                            key={index}
                                            className={` ${isActive ? 'bg-gray-200' : ''} p-18 whitespace-nowrap text-dark-700 mt-7`}
                                            >
                                                <Link href={link.route} key={index} className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-400 hover:bg-white/10 rounded-lg transition'>
                                                    <div className='flex items-center flex-1 gap-2'>
                                                         <div className='flex-center w-10 h-10 rounded-md'>
                                                            {link.icon && typeof link.icon === 'string' ? getIcon(link.icon) : null}
                                                        </div>
                                                        <span className='pl-3'>{link.label}</span>
                                                    </div>
                                                </Link>

                                        </li>
                                    )

                                })}
                                <li className='flex justify-between cursor-pointer gap-2 p-4'>
                                    <UserButton afterSignOutUrl='/' showName />
                                </li>
                            </ul>
                                    
                        </>
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