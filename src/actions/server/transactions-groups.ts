'use server'

import { getSupabaseClient, getSupabaseClientWithUser } from '@/lib/server'
import { TransactionGroups, TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { unstable_cache as cache, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

// type GetTransactionGroupsProps = Promise<
//   {
//     created_at: string
//     id: string
//     title: string
//     user_id: string | null
//   }[] | null
// >

export async function getTransactionsGroup(): Promise<TransactionGroups[] | null> {
  return await cache(
    async () => {
      const supabase = await getSupabaseClient()
      if (!supabase) return null

      const { data } = await supabase.from('transactions_groups').select('*')
      if (!data) return null

      if (data.length === 0) {
        await addTransactionsGroup({ title: 'Global' })
        return getTransactionsGroup()
      }

      return data
    },
    ['transactions-group'],
    { revalidate: false, tags: ['transactions-group'] },
  )()
}

export async function getTransactionsGroupById(id: string) {
  const transactionsGroup = await getTransactionsGroup()
  return transactionsGroup?.find((group) => group.id === id)
}

export async function addTransactionsGroup(formData: TransactionGroupsInsert) {
  const { supabase, user } = await getSupabaseClientWithUser()
  if (!supabase || !user) return

  const formDataWithId = { ...formData, user_id: user.id }

  const { data, error } = await supabase
    .from('transactions_groups')
    .insert({ ...formDataWithId })
    .select('id')

  if (!error) {
    revalidateTag('get-transactions-group')
    redirect(`/dashboard/transactions/${data[0].id}?title=${formData.title}`)
  }
}

export async function updateTransactionsGroup(formData: TransactionGroupsUpdate) {
  const supabase = await getSupabaseClient()
  if (!supabase || !formData.id) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id)

  revalidateTag('get-transactions-group')
}

export async function deleteTransactionsGroup(id: string) {
  const supabase = await getSupabaseClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidateTag('get-transactions-group')
  redirect('/')
}

// async function redirectToFirstTransactionsGroup() {
//   const transactionsGroup = await getTransactionsGroup()
//   if (!transactionsGroup) redirect('/')
// }
