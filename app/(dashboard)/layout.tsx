import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <section className=''>
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
                <Sidebar />
            </div>
        </div>
        <main className='md:pl-72'>
            <MobileNav />
            {children}
        </main>
    </section>
  )
}

export default DashboardLayout