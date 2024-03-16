"use client"

import { navLinks } from '@/constants'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Bolt, Building2, HandCoins, Laugh, LayoutDashboard, PencilRuler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { MAX_FREE_COUNTS } from '@/constant'
import FreeCounter from './FreeCounter'

interface SidebarProps {
    apiLimitCount: number
}

const Sidebar = ({apiLimitCount=0}: SidebarProps) => {

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
    const pathname = usePathname()

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111837]  text-white'>
        <div className='px-3 py-2'>
            <Link href="/dashboard" className='flex-center pl-3 mb-14'>
                <div className='relative'>
                    <Image
                        src="/assets/images/logo-black.svg"
                        alt="logo"
                        width={180}
                        height={180}
                    />
                </div>
            </Link>
            <div className='flex flex-col justify-between h-full '>
                
                    <ul className='sidebar-nav_elements'>
                        {navLinks.slice(0, 3).map((link, index) => {
                            const isActive = pathname === link.route
                            return (
                                <li 
                                    key={index} 
                                    className={`${isActive ? 'bg-gray-700 rounded-lg' : '' } whitespace-nowrap text-dark-700`}>
                                    <Link href={link.route} className='text-sm group flex p-4 w-full justify-start font-medium cursor-pointer hover:text-slate-400 hover:bg-white/10 rounded-lg transition'>
                                        <div className='flex items-center flex-1 gap-2'>
                                            <div className='flex-center w-10 h-10 bg-gray-800 rounded-md'>
                                                {link.icon && typeof link.icon === 'string' ? getIcon(link.icon) : null}
                                            </div>
                                            <span className='pl-3'>{link.label}</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className='sidebar-nav_elements'>
                        {navLinks.slice(3).map((link, index) => {
                            const isActive = pathname === link.route

                            return (
                                <li 
                                    key={index}
                                    className={` ${isActive ? ' bg-gray-700 rounded-lg' : ''} whitespace-nowrap text-dark-700`}
                                    >
                                        <Link href={link.route} key={index} className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-400 hover:bg-white/10 rounded-lg transition'>
                                            <div className='flex items-center flex-1 gap-2'>
                                                <div className='flex-center w-10 h-10 bg-gray-800 rounded-md'>
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
            </div>
        </div>
        <div>
             <FreeCounter apiLimitCount={apiLimitCount} />
        </div>
    </div>
  )
}

export default Sidebar