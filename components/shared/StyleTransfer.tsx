"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Slider } from "@/components/ui/slider"


import { amountOptions, resolutionOptions, stepOptions } from '@/constants'

import { useToast } from '../ui/use-toast'
import MediaUploader from './MediaUploader'
import MediaUploader2 from './MediaUploader2'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/use-pro-modal'
import { useEventRunDetails } from '@trigger.dev/react'
import { RunId } from '../trigger/RunId'
import TextBox from './TextBox'
import { RunIdStyle } from '../trigger/RunIdStyle'

const formSchema = z.object({
    secure_url_1: z.string(),
    secure_url_2: z.string(),
    guidance_scale: z.number(),
    style_strength: z.number(),
    structure_strength: z.number(),
  })

const StyleTransfer = () => {

    const proModal = useProModal()

    const [images, setImages] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const { toast } = useToast()
    const router = useRouter()

    //cloudinary
    const [image1, setImage1] = React.useState();
    const [image2, setImage2] = React.useState();

    //trigger
    const [eventId, setEventId] = React.useState("");
    const { isLoading, isError, data, error } = useEventRunDetails(eventId);

    React.useEffect(() => {
        setIsSubmitting(false);
        router.refresh()
      }, [images]);
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            secure_url_1: "",
            secure_url_2: "",
            guidance_scale: 8,
            style_strength: 0.4,
            structure_strength: 0.6
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        try {
            setIsSubmitting(true);
            const response = await fetch ('/api/trigger-style', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok){
                const errorData = await response.json();
                if (response.status === 403) {
                    console.error("Free trial has expired: ", errorData)
                    proModal.onOpen();
                    setIsSubmitting(false);
                } else {
                    console.error("Failed to trigger job: ", errorData)
                    setIsSubmitting(false);
                }
            }

            const {eventId} = await response.json();
            //console.log(eventId);
            setEventId(eventId);

        } catch (error) {
            console.error("Failed to trigger job: ", error)
        }

    }




  return (
    <div>
        <div>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col items-center gap-4"    
                >
                    <div className='w-full flex flex-col md:flex-row justify-between gap-4
                    '> 
                        <FormField 
                            control={form.control}
                            name="secure_url_1"
                            render= {({ field }) => (
                                <FormItem className='w-full'>
                                    <MediaUploader 
                                        onValueChange={field.onChange}
                                        setImage={setImage1}
                                        publicId={field.value}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="secure_url_2"
                            render= {({ field }) => (
                                <FormItem className='w-full'>
                                    <MediaUploader2 
                                        onValueChange={field.onChange}
                                        setImage={setImage2}
                                        publicId={field.value}
                                    />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField 
                        control={form.control}
                        name="style_strength"
                        defaultValue={0.4}
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='flex flex-col'>
                                    <div>
                                        <div className='flex flex-row justify-between w-full mb-4 mt-4'>
                                            <FormLabel>Style Strength</FormLabel>
                                            <FormLabel style={{ color: 'grey', fontWeight: 'normal' }}>(minimum: 0, maximum: 3)</FormLabel>
                                        </div>
                                        <FormControl>
                                        <div className='flex gap-4'>
                                            <Slider
                                                onValueChange={(v)=> field.onChange(v[0])} 
                                                defaultValue={[0.4]} 
                                                max={3} 
                                                step={0.1} />
                                            <TextBox value={field.value} />
                                        </div>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormLabel 
                                            style={{ color: 'grey', fontWeight: 'normal' }}
                                        >How much of the style should get applied.</FormLabel>
                                    </div>

                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="structure_strength"
                        defaultValue={0.6}
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='flex flex-col'>
                                    <div>
                                        <div className='flex flex-row justify-between w-full mb-4 mt-4'>
                                            <FormLabel>Structure Strength</FormLabel>
                                            <FormLabel style={{ color: 'grey', fontWeight: 'normal' }}>(minimum: 0, maximum: 3)</FormLabel>
                                        </div>
                                        <FormControl>
                                        <div className='flex gap-4'>
                                            <Slider
                                                onValueChange={(v)=> field.onChange(v[0])} 
                                                defaultValue={[0.6]} 
                                                max={3} 
                                                step={0.1} />
                                            <TextBox value={field.value} />
                                        </div>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormLabel 
                                            style={{ color: 'grey', fontWeight: 'normal' }}
                                        >How much of the original image structure should be maintained.
                                        </FormLabel>
                                    </div>

                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="guidance_scale"
                        defaultValue={8}
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='flex flex-col'>
                                    <div>
                                        <div className='flex flex-row justify-between w-full mb-4 mt-4'>
                                            <FormLabel>Guidance Scale</FormLabel>
                                            <FormLabel style={{ color: 'grey', fontWeight: 'normal' }}>(minimum: 1, maximum: 20)</FormLabel>
                                        </div>
                                        <FormControl>
                                        <div className='flex gap-4'>
                                            <Slider
                                                onValueChange={(v)=> field.onChange(v[0])} 
                                                defaultValue={[8]} 
                                                max={20} 
                                                step={1} />
                                            <TextBox value={field.value} />
                                        </div>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormLabel 
                                            style={{ color: 'grey', fontWeight: 'normal' }}
                                        >Classifier-free guidance scale
                                        </FormLabel>
                                    </div>

                                </div>
                            </FormItem>
                        )}
                    />

                <Button 
                    className='col-span-12 lg:col-span-2 w-full'
                    disabled={isSubmitting}
                    >
                        Generate
                </Button>


                    
                </form>
            </Form>
        </div>
        <RunIdStyle runId={data?.id as string} setInfo={setImages} />
        <div className="h-[200px]" />
    </div>
  )
}

export default StyleTransfer