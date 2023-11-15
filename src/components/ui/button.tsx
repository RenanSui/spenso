import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-black shadow dark:hover:bg-neutral-200',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-700',
        outline:
          'border text-black bg-transparent hover:bg-neutral-100 shadow-sm dark:border-neutral-900 dark:hover:bg-neutral-900 dark:text-white',
        ghost:
          'hover:bg-neutral-200 text-neutral-950 dark:hover:bg-neutral-900 dark:text-neutral-100',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
