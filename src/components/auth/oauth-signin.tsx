'use client'

import { BuiltInProviderType } from 'next-auth/providers/index'
import { LiteralUnion } from 'next-auth/react'
import { useState } from 'react'
import { Icons } from '../ui/icons'
import { ProviderSignIn } from './provider-signin'

export type OAuthProviders = {
  name: string
  providerType: LiteralUnion<BuiltInProviderType>
  icon: keyof typeof Icons
}

const oauthProviders: OAuthProviders[] = [
  { name: 'Google', providerType: 'google', icon: 'google' },
  { name: 'Discord', providerType: 'discord', icon: 'discord' },
  { name: 'Github', providerType: 'github', icon: 'github' },
]

export const OAuthSignIn = () => {
  const [isSigning, setIsSigning] = useState(false)

  return (
    <>
      {oauthProviders.map((provider) => (
        <ProviderSignIn
          key={provider.name}
          disabled={isSigning}
          provider={provider}
          setIsSigning={setIsSigning}
        />
      ))}
    </>
  )
}
