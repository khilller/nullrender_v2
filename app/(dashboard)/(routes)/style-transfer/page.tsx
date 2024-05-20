import Header from '@/components/shared/Header'
import { PaintBucket } from 'lucide-react'
import React from 'react'
import { auth } from '@clerk/nextjs'
import TransformationExterior from "@/components/shared/TransformationExterior"
import TransformationInterior from '@/components/shared/TransformationInterior'
import Sketch2img from '@/components/shared/Sketch2img'
import StyleTransfer from '@/components/shared/StyleTransfer'

const page = async () => {
    const { userId } = auth()
    //const user = await getUserById(userId)

  return (
    <section className=''>
    
    <Header
        title='Style Transfer'
        description="Transfer the style of one image to another."
        icon={PaintBucket}
        iconColor='text-blue-500'
        bgColor='bg-slate-200'
        />
    <div className='px-4 lg:px-8 w-full gap-x-3 mb-8'>
        <StyleTransfer />
    </div>
    </ section>
  )
}

export default page