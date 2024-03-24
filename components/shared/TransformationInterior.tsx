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

import { amountOptions, resolutionOptions, stepOptions } from '@/constants'

import { useToast } from '../ui/use-toast'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import MediaUploader from './MediaUploader'



import { useProModal } from '@/hooks/use-pro-modal'
import { useRouter } from 'next/navigation'

import { useEventDetails, useEventRunDetails, useRunDetails } from '@trigger.dev/react'
import { RunId } from '../trigger/RunId'
import { checkApiLimit } from '@/lib/api-limit'
  

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

 

  type RunIdType = string | null;

const TransformationInterior = () => {

    const proModal = useProModal()


    const [images, setImages] = React.useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [taskId, setTaskId] = React.useState<string | null>(null)
    const [url, setUrl] = React.useState<string>("")

    const { toast } = useToast()

    const router = useRouter()

    //cloudinary
    const [info, setInfo] = React.useState();

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
        prompt: "",
        amount: "1",
        secure_url: "",
        },
    })

    const isThinking = form.formState.isSubmitting;
 
  // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true);
      try {

        const response = await fetch ('/api/trigger-depthmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        if (!response.ok){
          const errorData = await response.json();
          if (response.status === 403) {
            console.error("Free trial has expired: ", errorData)
            proModal.onOpen();
            setIsSubmitting(false);
          } else {
            console.error("Failed to trigger job: ", errorData);
            setIsSubmitting(false);
          }
        }

        const {eventId} = await response.json();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col lg:flex lg:flex-col gap-2 items-center">
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                    <FormItem className='col-span-12 lg:col-span-2 w-full'>
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
        <div>
        </div>
    </div>
  )
}

export default TransformationInterior