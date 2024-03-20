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

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

  type PredictionType = {
    completed_at: string;
    created_at: string;
    error: string | null;
    id: string;
    input: any; // replace 'any' with the actual type if you know it
    logs: string;
    metrics: { predict_time: number };
    model: string;
    output: string[];
    started_at: string;
    status: string;
    urls: { cancel: string; get: string };
    version: string;
  };

const Sketch2img = () => {

    const proModal = useProModal()

    const [images, setImages] = React.useState<string[]>([])
    const [prediction, setPrediction] = React.useState<PredictionType | null>(null)
    const [error, setError] = React.useState(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
      // State to track whether polling should occur
  const [isProcessing, setIsProcessing] = React.useState(false);

    const { toast } = useToast()

    const router = useRouter()

    //cloudinary
    const [info, setInfo] = React.useState();


    React.useEffect(() => {
        if (images && images.length > 0) {
          router.refresh();
          
        }
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

    const isLoading = form.formState.isSubmitting;
 
  // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
          setImages([])
      
          const response = await fetch("/api/sketch", {
            method: "POST",
            body: JSON.stringify(values)
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 403) {
              console.error("Free trial expired:", errorData);
              proModal.onOpen();
              setIsSubmitting(false);
              return;
            } else {
              const error = new Error(`HTTP error! status: ${response.status}`);
              setIsSubmitting(false);
              throw error;
            }
          }
      
          let initialPrediction = await response.json();
          setPrediction(initialPrediction);
          
          let predictionId = initialPrediction.id;
          //let attempts = 0;
          //const maxAttempts = 30;
  
          const timer = setInterval(async () => {
            const response = await fetch ("/api/sketch/" + predictionId)
            initialPrediction = await response.json()
  
            if (response.status !== 200) {
              setError(initialPrediction.detail)
              return
            }
  
            setPrediction(initialPrediction)
            if (initialPrediction.status === "succeeded") {
              setImages(initialPrediction.output)
              return;
            }
  
          })
  
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
        <div className='space-y-4 mt-4'>
            {prediction && prediction.status !== 'succeeded' &&  (
                <div className='p-8 rounded-lg w-full flex items-center justify-center'>
                    <Loader />
                </div>

            )}

            {prediction && prediction.status === 'succeeded' && (
                <div className='space-y-4 mt-10 border rounded-lg p-4'>
                    <div>
                        <h2 className='text-3xl font-bold text-center'>Generated Images</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                        {images.slice(1).map((image, index) => (
                            <Card key={index} className='rounded-lg overflow-hidden'>
                                <div className='relative aspect-square'>
                                    <Image
                                        alt="Generated Image"
                                        src={image}
                                        layout='fill'
                                        objectFit='cover'
                                        />
                                </div>
                                <CardFooter>
                                    <Button variant="secondary" className='w-full mt-4' onClick={() => {window.open(image)}}>
                                        <Download className='h-4 w-4 mr-2' />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        
                        ))}
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Sketch2img