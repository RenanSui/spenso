'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'

import type { Database } from '../database.types'

export const createServerClient = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      db: { schema: 'next_auth' },
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken ?? ''}`,
        },
      },
    },
  )
}

export const valueFormatter = (number: number) => {
  'use server'
  return `$ ${new Intl.NumberFormat('us').format(number).toString()}`
}
