'use server'

import { getUserId } from '@/actions/server/user'
import { Database } from '@/types/database.types'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

export const createServerClient = async () => {
  const session = await getServerSession(authOptions)

  return session?.supabaseAccessToken
    ? createClient<Database>(
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
    : null
}

export const createPublicServerClient = async () => {
  const session = await getServerSession(authOptions)

  return session?.supabaseAccessToken
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
        {
          db: { schema: 'public' },
          global: {
            headers: {
              Authorization: `Bearer ${session?.supabaseAccessToken ?? ''}`,
            },
          },
        },
      )
    : null
}

export const getSupabaseClient = async () => {
  return { supabase: await createServerClient(), userId: await getUserId() }
}

export const getSupabasePublicClient = async () => {
  return { supabase: await createPublicServerClient() }
}
