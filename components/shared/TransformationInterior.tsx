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
import { Download } from 'lucide-react'

import Loader from './Loader'
import { useProModal } from '@/hooks/use-pro-modal'
import { useRouter } from 'next/navigation'
  

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

const TransformationInterior = () => {

    const proModal = useProModal()


    const [images, setImages] = React.useState<string[]>([])
    const [prediction, setPrediction] = React.useState<PredictionType | null>(null)
    const [error, setError] = React.useState(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [taskId, setTaskId] = React.useState<string | null>(null)

    const { toast } = useToast()

    const router = useRouter()

    //cloudinary
    const [info, setInfo] = React.useState();

    React.useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if(prediction?.status !== "succeeded" && prediction?.status !== 'failed') {
          interval = setInterval(async () => {
            try {
              const updateResponse = await fetch(`/api/depthmap/${prediction?.id}`, {
                cache: 'no-store',
              });
              
              if (!updateResponse.ok) {
                throw new Error(`HTTP error! status: ${updateResponse.status}`);
              }
      
              const updatedPrediction = await updateResponse.json();
              setPrediction(updatedPrediction);
              //console.log('Updated prediction:', prediction);
      
              if (updatedPrediction.status === 'succeeded' || updatedPrediction.status === 'failed') {
                clearInterval(interval);
                if (updatedPrediction.status === 'succeeded') {
                  setImages(updatedPrediction.output);
                }
              }
            } catch (error) {
              console.error('Error:', error);
              clearInterval(interval);
            }
          }, 2000); // Poll every second
        }
      
        return () => {
          if(interval) {
            clearInterval(interval); // Clear the interval if the component is unmounted
          }
        };
      }, [prediction]);



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
        setIsSubmitting(true);

        try {
          // Clear previous images
          setImages([]);
      
          // Start the prediction task
          const response = await fetch('/api/depthmap', {
            method: 'POST',
            body: JSON.stringify(values),
          });
      
          if(!response.ok) {
            const errorData = await response.json()
            if (response.status === 403) {
                console.error("Free trial expires:", errorData)
                proModal.onOpen()
                setIsSubmitting(false)
                return;
            } else {
            const error = new Error(`HTTP error! status: ${response.status}`)
            setIsSubmitting(false);
            throw error;
        }
    }
      
          const initialPrediction = await response.json();
          setIsSubmitting(false); // Prediction task is started, no longer submitting
      
          // Store initial prediction state
          setPrediction(initialPrediction);
          //console.log('Initial prediction:', initialPrediction);
      
        } catch (error: any) {
          console.error('Error:', error);
          setIsSubmitting(false);
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
                            disabled={isLoading}
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
                                disabled={isLoading}
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
                    disabled={isLoading}
                    >
                        Generate
                </Button>
            </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4'>
            {prediction && prediction.status !== 'succeeded' && (
                <div className='p-8 rounded-lg w-full flex items-center justify-center'>
                    <Loader />
                </div>

            )}

             
            {prediction && prediction.status === 'succeeded' &&(
                <div className='space-y-4 mt-10 border rounded-lg p-4'>
                <div>
                    <h2 className='text-3xl font-bold text-center'>Generated Images</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-4 mt-8'>
                    {images.slice(1).map((image, index) => (
                        <Card key={index} className='rounded-lg overflow-hidden'>
                            <div className='relative aspect-square'>
                                <Image
                                    alt="Generated Image"
                                    src={image}
                                    fill
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

export default TransformationInterior