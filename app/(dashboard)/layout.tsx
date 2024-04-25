'use client'

import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { useCreditStore } from '@/hooks/free-credit'

import React, { useState, useEffect} from 'react'

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode
}) => {

    const apiLimitCount = useCreditStore(state => state.freeCredit)

    //const apiLimitCount = await getApiLimitCount()
    
  return (
    <section className=''>
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
                <Sidebar apiLimitCount={apiLimitCount}/>
            </div>
        </div>
        <main className='md:pl-72'>
            <MobileNav apiLimitCount={apiLimitCount}/>
            {children}
        </main>
    </section>
  )
}

export default DashboardLayout