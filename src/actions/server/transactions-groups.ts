'use server'

import { getUser } from '@/lib/auth'
import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { normalizeString } from '@/lib/utils'
import { TransactionGroups, TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type SupabaseCacheFn = {
  supabase: ReturnType<typeof getSupabaseServerClient>
  email: string | null | undefined
}

export async function getGroups(supabaseCache?: SupabaseCacheFn): Promise<TransactionGroups[] | null> {
  const fnCache = supabaseCache || {
    supabase: getSupabaseServerClient(),
    email: (await getUser())?.email,
  }

  return fnCache.email
    ? await cache(
        async () => {
          const supabase = await fnCache.supabase
          if (!supabase) return null

          const { data } = await supabase.from('transactions_groups').select('*')
          if (!data) return null

          if (data.length === 0) {
            await addGroup({ title: 'Global' })
            return getGroups(fnCache)
          }

          return data
        },
        [`transactions-group-${fnCache.email}`],
        { revalidate: false, tags: [`transactions-group-${fnCache.email}`] },
      )()
    : null
}

export async function getGroupBySearch(input: string) {
  const groups = await getGroups()
  const cleanInput = normalizeString(input.toLowerCase())

  return groups?.filter((group) => {
    const cleanTitle = normalizeString(group.title.toLowerCase())
    return cleanTitle.includes(cleanInput)
  })
}

export async function getGroupById(id: string) {
  const groups = await getGroups()
  return groups?.find((group) => group.id === id)
}

export async function addGroup(formData: TransactionGroupsInsert) {
  const { supabase, user } = await getSupabaseServerClientWithUser()
  if (!supabase || !user) return null

  const formDataWithId = { ...formData, user_id: user.id }

  return await supabase
    .from('transactions_groups')
    .insert({ ...formDataWithId })
    .select('*')
}

export async function updateGroup(formData: TransactionGroupsUpdate) {
  const supabase = await getSupabaseServerClient()
  if (!supabase || !formData.id) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id)

  revalidatePath(`/dashboard/transactions/${formData.id}`)
}

export async function deleteGroup(id: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidateGroup()
  redirect('/dashboard/transactions/')
}

export async function revalidateGroup() {
  const user = await getUser()
  const email = user?.email
  revalidateTag(`transactions-group-${email}`)
}
