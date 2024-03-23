"use client"

import React from 'react'
import { Montserrat } from 'next/font/google'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'


const LandingNav = () => {
    const { isSignedIn } = useAuth()
    

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
        <Link href='/' className='flex items-center'>
            <div className='relative mr-4'>
                <Image 
                    src='/assets/images/logo.svg'
                    alt='logo'
                    width={180}
                    height={180}
                    className='hidden md:block'
                />
                <Image 
                    src='/assets/images/logo.svg'
                    alt='logo'
                    width={140}
                    height={140}
                    className=' md:hidden'
                />
            </div>
        </Link>
        <div className='flex items-center gap-x-2'>
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button className='rounded-full ' variant='outline'> 
                    {isSignedIn ? 'Dashboard' : 'Get Started'}
                </Button>
            </Link>

        </div>
    </nav>
  )
}

export default LandingNav