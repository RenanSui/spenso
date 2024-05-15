'use server'

import { getUser } from '@/lib/auth'
import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { normalizeString } from '@/lib/utils'
import { TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getGroups() {
  const { supabase, user } = await getSupabaseServerClientWithUser()
  if (!supabase || !user) return null

  return await cache(
    async () => {
      const { data } = await supabase.from('transactions_groups').select('*')
      if (!data) return null

      if (data.length === 0) {
        const result = await addGroup({ title: 'Global' })
        if (!result) return null

        const { data, error } = result
        if (!data || error) return null

        return data
      }

      return data
    },
    [`transactions-group-${user.email}`],
    {
      revalidate: false,
      tags: [`transactions-group-${user.email}`],
    },
  )()
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

  const { data, error } = await supabase
    .from('transactions_groups')
    .insert({ ...formDataWithId })
    .select('*')

  revalidatePath(`/dashboard/groups`)

  return { data, error }
}

export async function updateGroup(formData: TransactionGroupsUpdate) {
  const supabase = await getSupabaseServerClient()
  if (!supabase || !formData.id) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id)

  revalidatePath(`/dashboard/groups/${formData.id}`)
}

export async function deleteGroup(id: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidatePath(`/dashboard/groups`)
  redirect('/dashboard/groups')
}

export async function revalidateGroup() {
  const user = await getUser()
  const email = user?.email
  revalidateTag(`transactions-group-${email}`)
}
