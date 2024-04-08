'use server'

import { getSupabaseClient, getSupabaseClientWithUser } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import { TransactionInsert, TransactionUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath } from 'next/cache'

export async function getTransactions() {
  return await cache(
    async () => {
      const supabase = await getSupabaseClient()
      if (!supabase) return null

      const { data } = await supabase.from('transactions').select('*')

      return data
    },
    ['transactions'],
    { revalidate: false, tags: ['transactions'] },
  )()
}

export async function getTransactionsById(groupId: string) {
  return await cache(
    async () => {
      const supabase = await getSupabaseClient()
      if (!supabase) return null

      const { data } = await supabase.from('transactions').select('*').eq('group_id', groupId)

      return data
    },
    [`transactions-${groupId}`],
    { revalidate: false, tags: [`transactions-${groupId}`] },
  )()
}

export async function addTransaction(formData: TransactionInsert) {
  const { supabase, user } = await getSupabaseClientWithUser()
  if (!supabase || !user) return

  const formDataWithId = {
    ...formData,
    user_id: user.id,
    amount: positiveOrNegative(formData.type, formData.amount),
  }

  await supabase.from('transactions').insert({ ...formDataWithId })

  revalidatePath(`/dashboard/transactions/${formData.group_id}`)
  revalidatePath(`/dashboard/analytics`)
}

export async function updateTransaction(formData: TransactionUpdate) {
  const supabase = await getSupabaseClient()
  if (!supabase || !formData.type || !formData.amount) return

  const { id, ...formDataObj } = formData
  const formattedData = {
    ...formDataObj,
    amount: positiveOrNegative(formData.type || '', formData.amount || 0),
  }

  await supabase
    .from('transactions')
    .update({ ...formattedData })
    .eq('id', id ?? '')

  revalidatePath(`/dashboard/transactions/${formData.group_id}`)
  revalidatePath(`/dashboard/analytics`)
}

export async function updateTransactionGroup(transactionId: string, oldGroupId: string, newGroupId: string) {
  const supabase = await getSupabaseClient()
  if (!supabase) return

  await supabase.from('transactions').update({ group_id: newGroupId }).eq('id', transactionId)

  revalidatePath(`/dashboard/transactions/${oldGroupId}`)
  revalidatePath(`/dashboard/transactions/${newGroupId}`)
  revalidatePath(`/dashboard/analytics`)
}

export async function deleteTransaction(id: string, groupId?: string) {
  const supabase = await getSupabaseClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidatePath(`/dashboard/transactions/${groupId}`)
  revalidatePath(`/dashboard/analytics`)
}
