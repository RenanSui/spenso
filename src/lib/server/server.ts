import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'

export const createServerClient = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  return createClient(
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
