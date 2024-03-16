import Header from '@/components/shared/Header'
import { Bolt } from 'lucide-react'
import React from 'react'
import { auth } from '@clerk/nextjs'
import TransformationExterior from "@/components/shared/TransformationExterior"
import TransformationInterior from '@/components/shared/TransformationInterior'

const page = async () => {
    const { userId } = auth()
    //const user = await getUserById(userId)

  return (
    <section className=''>
    
    <Header
        title='Interior Render'
        description="Render beautiful interiors with the smartest AI."
        icon={Bolt}
        iconColor='text-pink-600'
        bgColor='bg-slate-200'
        />
    <div className='px-4 lg:px-8 w-full gap-x-3 mb-8'>
        <TransformationInterior />
    </div>
    </ section>
  )
}

export default page