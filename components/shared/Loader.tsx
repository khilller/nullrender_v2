import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 animate-spin flex items-center justify-center'> 
        <LoaderCircle width={30} height={30} />
      </div>
      <div className='text-sm text-muted-background'>
        nullrender is thinking...
      </div>
    </div>
  )
}

export default Loader