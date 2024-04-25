"use client"

import React from 'react'

import axios from 'axios'
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

import { Card, CardFooter } from "@/components/ui/card"
import { amountOptions, resolutionOptions, stepOptions } from '@/constants'

import { useToast } from '../ui/use-toast'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import MediaUploader from './MediaUploader'
import Image from 'next/image'
import { Download, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Loader from './Loader'
import { useProModal } from '@/hooks/use-pro-modal'
import { useEventRunDetails } from '@trigger.dev/react'
import { RunId } from '../trigger/RunId'
  

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image prompt is required"
    }),
    amount: z.string().min(1),
    secure_url: z.string(),
  })

  interface path {
    path: string
  }


const TransformationExterior = () => {

    const proModal = useProModal()

    const [images, setImages] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const { toast } = useToast()

    const router = useRouter()

    //cloudinary
    const [info, setInfo] = React.useState();
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
        prompt: "",
        amount: "1",
        secure_url: "",
        },
    })

    const isThinking = form.formState.isSubmitting;
 
  // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      //setIsSubmitting(true);
      try {
        const response = await fetch ('/api/trigger-hough', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        const responseData = await response.json();

        if (!response.ok){
          if (response.status === 403) {
            console.error("Free trial has expired: ", responseData)
            proModal.onOpen();
            setIsSubmitting(false);
          } else {
            console.error("Failed to trigger job: ", responseData)
            setIsSubmitting(false);
          }
        }
        
        const {eventId} = responseData;
        console.log(eventId);
        setEventId(eventId);

      } catch (error) {
        console.error('Failed to trigger job:', error);
      }
      

    }

  return (
    <div>
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col items-center gap-2">
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                    <FormItem className='col-span-12 lg:col-span-6 w-full'>
                    <FormControl className='m-0 p-0'>
                        <Input 
                            placeholder="a cheerful modernist bedroom" 
                            {...field}
                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                            disabled={isSubmitting}
                            />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-2 w-full'>
                            <Select
                                disabled={isSubmitting}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {amountOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}

                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </FormItem>
                    )}
                />
                <div className='media-uploader-field'>
                    <FormField
                        control={form.control}
                        name="secure_url"
                        render={({ field }) => (
                            <FormItem className='col-span-12 lg:col-span-2'>
                                <FormControl>
                                    <MediaUploader
                                        onValueChange={field.onChange}
                                        setImage={setInfo}
                                        publicId={field.value}
                                        />
                                </FormControl>
                            </FormItem>
                        )}
                        />
              </div>
              
                <Button 
                    className='col-span-12 lg:col-span-2 w-full'
                    disabled={isSubmitting}
                    >
                        Generate
                </Button>
            </form>
            </Form>
        </div>
        <RunId runId={data?.id as string} setInfo={setImages} />
    </div>
  )
}

export default TransformationExterior