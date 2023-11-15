'use client'

import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { ButtonHTMLAttributes, useState } from 'react'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'

export const Signout = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      disabled={isLoading}
      className={cn(className, 'bg-white text-black hover:bg-neutral-200')}
      variant="default"
      size="sm"
      onClick={() => {
        setIsLoading(true)
        signOut({ callbackUrl: '/' })
      }}
      {...props}
    >
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
