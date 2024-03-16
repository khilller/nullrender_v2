import { cn } from '@/lib/utils';
import React from 'react'

interface HeaderProps {
    title: string;
    description: string;
    icon: any;
    iconColor?: string;
    bgColor?: string;

}

const Header = ({
    title,
    description,
    icon,
    iconColor,
    bgColor
}: HeaderProps) => {
    const Icon = icon
    return (
        <>
            <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-8 mt-10'>
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                    <Icon className={cn("w-10 h-10", iconColor)} />
                </div>
                <div>
                    <h2 className='text-3xl font-bold'>
                        {title}
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}
export default Header