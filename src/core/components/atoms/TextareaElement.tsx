import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { TextareaHTMLAttributes } from 'react'
import { ReactNode } from 'react'


export interface TextareaElementProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { 
    label?: string
}


export const TextareaElement = ({ className, ...props }: TextareaElementProps) => {
    return (
        <textarea
            {...props}
            className={clsx(
                'resize-none p-2 rounded-md border text-gray-500 focus:outline-none w-full h-56',
                className
            )}>
        </textarea>
    )
}