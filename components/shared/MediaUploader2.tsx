'use client'

import React from 'react'
import { useToast } from '../ui/use-toast'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { ImagePlus } from 'lucide-react'


type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;

}

interface Info {
    width?: number;
    height?: number;
    secure_url?: string;
}

const MediaUploader2 = ({onValueChange, setImage, publicId}: MediaUploaderProps) => {

    const { toast } = useToast()
    const [info, setInfo] = React.useState<Info | undefined>();

    const onUploadErrorHandler = () => {
        toast({
            title: "Something went wrong while uploading?",
            description: "Please try again.",
            duration: 5000,
            className: "error-toast"
        })
    }

    const uploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            secureUrl: result?.info?.secure_url,
            width: result?.info?.width,
            height: result?.info?.height,
        }))

        onValueChange(result?.info?.secure_url)

        setInfo(result?.info)

        toast({
            title: "Image uploaded successfully",
            description: "1 Credit was deducted from your account.",
            duration: 5000,
            className: "success-toast"
        })
    }
  return (
    <CldUploadWidget
        uploadPreset='cld_test'
        options={{
            multiple: false,
            resourceType: 'image',
        }}
        onSuccess={uploadSuccessHandler}
        onError={onUploadErrorHandler}
    >
        {({ open}) => {
            function handleOnclick(e:any) {
                e.preventDefault()
                open();
            }
            return (
                <div className='flex flex-col gap-4 mt-4'>
                <h3 className='font-regular text-sm text-center text-dark-600'>Image Style</h3>
                    {publicId ? (
                        <>
                            <div className='cursor-pointer overflow-hidden rounded-lg'>

                                <CldImage 
                                    width={info?.width}
                                    height={info?.height}
                                    src={info?.secure_url || ''}
                                    alt="image"
                                    sizes={"(max-width: 768px) 100vw, 50vw"}
                                    
                                    />
                            </div>
                        </>
                    ) : (
                        <div className='media-uploader_cta' onClick={handleOnclick}>
                            <div className='media_uploader_cta_image'>
                                <ImagePlus size={24} />
                            </div>
                            <p className='text-dark-600'>Add Image</p>
                        </div>

                    )}
            </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default MediaUploader2