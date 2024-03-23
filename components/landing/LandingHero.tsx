"use client"

import { useAuth } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Spline from '@splinetool/react-spline'

const LandingHero = () => {

    const { isSignedIn } = useAuth()
  return (
    <section className='font-bold flex flex-col justify-center items-center text-center relative h-[550px] mb-24'>
        <div className='z-1 mr-5 absolute flex justify-center items-center w-full'>
            <Spline scene="https://prod.spline.design/p4fEV0E9kV9tgWb5/scene.splinecode" className='spline' />
        </div>
        <div className='text-5xl md:text-6l lg:text-7xl z-20 relative flex flex-col text-slate-100 mb-6'>
            <h1>Transform Design<span className='text-[#E04FD9] '>.</span></h1>
            <h1>Elevate Spaces<span className='text-[#E04FD9] '>.</span></h1>
        </div>
        <div className='text-md md:text-xl font-light text-slate-100 z-20 relative mb-6'>
            <p>Create 10x faster architectural renders</p>
        </div>
        <div> 
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}className=''>
                <Button variant="premium" className='rounded-full text-slate-100 text-md mt-8 mb-4 shadow-md p-4 md:p-6 font-semibold relative z-20' >
                        Try for free
                </Button>
            </Link>
        </div>
        <div className='text-zinc-100 text-sm md:text-sm font-normal relative'>
            <p>*No credit card required</p>

        </div>
    </section>
  )
}

export default LandingHero