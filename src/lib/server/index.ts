'use server'

import { type Database } from '@/types/database.types'
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

export const getSupabaseServerClient = async () => await createServerClient()

export const getSupabaseServerClientWithUser = async () => {
  const supabase = await createServerClient()
  const user = (await supabase?.from('users').select('*'))?.data?.[0]
  return { supabase, user }
}
