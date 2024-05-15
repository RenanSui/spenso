'use server'

import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { sortRecentTransactions } from '@/lib/transactions'
import { positiveOrNegative } from '@/lib/utils'
import { TransactionInsert, TransactionUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath } from 'next/cache'
import { getGroups } from './transactions-groups'

export async function getTransactions() {
  const groups = await getGroups()
  if (!groups) return null

  const groupIds = groups.map((map) => map.id)

  const transactionsArray = await Promise.all(
    groupIds.map(async (groupId) => {
      const transactionsById = await getTransactionsByGroupId(groupId)
      return transactionsById || []
    }),
  )

  const transactions = transactionsArray.flat()

  return sortRecentTransactions(transactions)
}

export async function getTransactionById(transactionId: string) {
  const transactions = await getTransactions()
  if (!transactions) return null

  const transaction = transactions.find((transaction) => transaction.id === transactionId)
  if (!transaction) return null

  return transaction
}

export async function getTransactionsByGroupId(groupId: string) {
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

export async function deleteTransaction(transactionId: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  const result = await getTransactionById(transactionId)
  if (!result) return

  await supabase.from('transactions').delete().eq('id', transactionId)

  revalidatePath(`/dashboard/groups/${result.group_id}/transactions`)
}
