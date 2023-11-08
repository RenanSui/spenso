import { createServerClient } from '@/lib/server/server'
import { User } from 'next-auth'

export const getUser = async () => {
  const supabase = await createServerClient()
  const { data } = await supabase.from('users').select('*')
  const user = data ? data[0] : []

  return user as User
}
