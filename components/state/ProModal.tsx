"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { Badge } from '../ui/badge';
import { Bolt, Building2, Check, HandCoins, Laugh, LayoutDashboard, PencilRuler, Zap } from 'lucide-react'
import { navLinks } from '@/constants';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import axios from 'axios';

const ProModal = () => {
  const proModal = useProModal()
  const [loading, setLoading] = React.useState(false)

  const getIcon = (iconName : string) => {
    switch (iconName) {
        case 'dashboard':
            return <LayoutDashboard className='text-sky-500'/>
        case 'interior':
            return <Bolt className='text-pink-600' />
        case 'exterior':
            return <Building2 className='text-violet-500' />
        case 'profile':
            return <Laugh className='text-orange-700' />
        case 'buy':
            return <HandCoins className='text-yellow-400'/>
        case 'sketch':
            return <PencilRuler className='text-green-500'/>
        default:
            return null;
    }
}

const onSubscribe = async () => {
  try {
    setLoading(true);
    const response = axios.get('/api/stripe');
    window.location.href = (await response).data.url;
  } catch (error) {
    console.error(error, "Stripe client error");
  } finally {
    setLoading(false);
  }
}

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-2'>
            <div className='flex justify-center items-center flex-row gap-2 gap-y-4'>
              Upgrade to Pro
              <Badge className='uppercase text-sm py-1' variant="premium">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {navLinks.slice(0, 3).map((link, index) => (
              <Card key={index} className='p-3 border-black/5 flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                  <div className="p-2 w-fit rounded-md bg-slate-200">
                    {getIcon(link.icon)}
                  </div>
                  <div>
                    {link.label}
                </div>
                </div>
                <Check />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="lg" variant="premium" className='w-full' onClick={onSubscribe}>
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal