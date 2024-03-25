import Header from '@/components/shared/Header'
import { Bolt, Building2 } from 'lucide-react'
import React from 'react'
import { auth } from '@clerk/nextjs'
import TransformationExterior from "@/components/shared/TransformationExterior"
import TransformationInterior from '@/components/shared/TransformationInterior'

const page = async () => {
    const { userId } = auth()
    //const user = await getUserById(userId)

  return (
    <section className='mb-52'>
    
    <Header
        title='Exterior Render'
        description="Render beautiful interiors with the smartest AI."
        icon={Building2}
        iconColor='text-violet-500'
        bgColor='bg-slate-200'
        />
    <div className='px-4 lg:px-8 w-full gap-x-3 mb-8'>
        <TransformationExterior />
    </div>
    </ section>
  )
}

export default page