import { authOptions } from '@/lib/auth'
import { createServerClient } from '@/lib/server'
import { getServerSession } from 'next-auth'

export type SessionUser = {
  name: string | null | undefined
  email: string | null | undefined
  image: string | null | undefined
}

export const getUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const { address, ...user } = session.user
  String(address) // disable error

  return user as SessionUser
}

export const getUserId = async () => {
  const supabase = await createServerClient()
  if (!supabase) return null

  const { data: user } = await supabase.from('users').select('id')
  if (!user) return null

  return user[0].id as string
}
