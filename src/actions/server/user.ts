import { createServerClient } from '@/lib/server/server'
import { User } from 'next-auth'

export const getUser = async () => {
  const supabase = await createServerClient()
  if (!supabase) return null

  const { data: user } = await supabase.from('users').select('*')
  if (!user) return null

  return user[0] as User
}
