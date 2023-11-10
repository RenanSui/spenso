'use client'

import { signIn } from 'next-auth/react'
import {
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { buttonVariants } from '../ui/button'
import { Icons } from '../ui/icons'
import { OAuthProviders } from './oauth-signin'

interface ProviderSignInProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: OAuthProviders
  setIsSigning: Dispatch<SetStateAction<boolean>>
}

export const ProviderSignIn = ({
  provider,
  setIsSigning,
  ...props
}: ProviderSignInProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState('')

  const Icon = Icons[provider.icon]

  useEffect(() => {
    const url = new URL(window.location.href)
    const callbackUrl = url.searchParams.get('callbackUrl') ?? ''
    setRedirectUrl(callbackUrl)
  }, [])

  return (
    <button
      className={buttonVariants({ variant: 'outline' })}
      onClick={() => {
        setIsLoading(true)
        signIn(provider.providerType, { callbackUrl: redirectUrl })
        setIsSigning(true)
      }}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
      )}
      {provider.name}
    </button>
  )
}
