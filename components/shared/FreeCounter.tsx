import React from 'react'
import { Card, CardContent } from '../ui/card'
import { MAX_FREE_COUNTS } from '@/constant'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

interface FreeCounterProps {
     apiLimitCount: number   
}

const FreeCounter = ({apiLimitCount=0}: FreeCounterProps) => {
    const promodal = useProModal()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    
  return (
    <div className='px-3 mt-20'>
                <Card className='bg-white/10 border-0'>
                    <CardContent className='py-6'>
                        <div className='text-center text-sm text-white space-y-2'>
                            <p>
                                {apiLimitCount} / {MAX_FREE_COUNTS} Free generations
                            </p>
                            <Progress
                                className='h-3'
                                value={(apiLimitCount/ MAX_FREE_COUNTS) * 100}
                            />
                        </div>
                        <Button className='w-full mt-3' variant='premium' onClick={promodal.onOpen}>
                            Upgrade
                            <Zap className='w-4 h-4 ml-2 fill-white' />
                        </Button>
                    </CardContent>
                </Card>
    </div>
  )
}

export default FreeCounter