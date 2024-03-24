"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { featureOptions } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
  

const LandingFeatures = () => {
    const { isSignedIn } = useAuth()
  return (
    <section className='px-10 pb-20' id="features">
        <div className='py-4 md:space-y-4 w-full'>
            <h2 className='home_page_text'>
                Features
            </h2>
        </div>
        <div className=' p-3 md:p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 md:mt-8'>
            {featureOptions.map((feature, index) => (
                <Card key={index} className="rounded-xl overflow-hidden bg-[#192339] shadow-md border-none">
                    <CardHeader className='space-y-0 p-0 mb-6 w-full '>
                        <Image
                        src={feature.image}
                        alt="Generated Image"
                        width={600}
                        height={600}
                        className='w-full'
                        />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className='text-slate-100'>{feature.label}</CardTitle>
                        <CardDescription className='mt-2'>{feature.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link href={isSignedIn ? '/dashboard' : '/sign-up'} >
                            <Button variant="secondary" className='shadow-md'>
                                Try for free
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </section>
  )
}

export default LandingFeatures