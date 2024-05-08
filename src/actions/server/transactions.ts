'use server'

import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import { TransactionInsert, TransactionUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath } from 'next/cache'
import { getGroups } from './transactions-groups'
import { sortRecentTransactions } from '@/lib/transactions'

export async function getTransactions() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return null

  const groups = await getGroups()
  if (!groups) return null

  const ids = groups.map((map) => map.id)

  const transactionsArray = await Promise.all(
    ids.map(async (id) => {
      const transactionsById = await getTransactionsById(id)
      return transactionsById || []
    }),
  )

  const transactions = transactionsArray.flat()

  return sortRecentTransactions(transactions)
}

export async function getTransactionsById(groupId: string) {
  const supabase = await getSupabaseServerClient()

  return await cache(
    async () => {
      if (!supabase) return null

      const { data: transactions } = await supabase.from('transactions').select('*').eq('group_id', groupId)
      if (!transactions) return null

      return sortRecentTransactions(transactions)
    },
    [`transactions-${groupId}`],
    { revalidate: false, tags: [`transactions-${groupId}`] },
  )()
}

export async function addTransaction(formData: TransactionInsert) {
  const { supabase, user } = await getSupabaseServerClientWithUser()
  if (!supabase || !user) return

  const formDataWithId = {
    ...formData,
    user_id: user.id,
    amount: positiveOrNegative(formData.type, formData.amount),
  }

  await supabase.from('transactions').insert({ ...formDataWithId })

  revalidatePath(`/dashboard/groups/${formData.group_id}/transactions`)
}

export async function updateTransaction(formData: TransactionUpdate) {
  const supabase = await getSupabaseServerClient()
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

  revalidatePath(`/dashboard/groups/${formData.group_id}/transactions`)
}

export async function updateTransactionGroup(transactionId: string, oldGroupId: string, newGroupId: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').update({ group_id: newGroupId }).eq('id', transactionId)

  revalidatePath(`/dashboard/groups/${oldGroupId}/transactions`)
  revalidatePath(`/dashboard/groups/${newGroupId}/transactions`)
}

export async function deleteTransaction(id: string, groupId?: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidatePath(`/dashboard/groups/${groupId}/transactions`)
}
