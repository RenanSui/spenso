'use server'

import { getSupabaseClient } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import { Transaction, TransactionInsert, TransactionUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'

const revalidateTransactions = () => revalidatePath('/dashboard/transactions/')

export const revalidateAllTransactionsGetters = async () => {
  revalidateTag('get-transactions')

  // by id
  revalidateTag('get-transactions-by-id')
}

export const getTransactions = cache(
  async () => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return null

    const { data } = await supabase.from('transactions').select('*')

    return data
  },
  [],
  { revalidate: false, tags: ['get-transactions'] },
)

export const getTransactionsById = cache(
  async (groupId: string) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return null

    const { data } = await supabase.from('transactions').select('*').eq('group_id', groupId)

    return data as Transaction[] | null
  },
  [],
  { revalidate: false, tags: ['get-transactions-by-id'] },
)

export const addTransaction = async (formData: TransactionInsert) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const formDataWithId = {
    ...formData,
    user_id: userId,
    amount: positiveOrNegative(formData.type, formData.amount),
  }

  await supabase.from('transactions').insert({ ...formDataWithId })

  revalidatePath(`/dashboard/transactions/${formData.group_id}`)
  revalidatePath(`/dashboard/analytics`)
}

export const updateTransaction = async (formData: TransactionUpdate) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const { id, ...formDataObj } = formData
  const formattedData = {
    ...formDataObj,
    amount: positiveOrNegative(formData.type || '', formData.amount || 0),
  }

  await supabase
    .from('transactions')
    .update({ ...formattedData })
    .eq('id', id ?? '')

  revalidateTransactions()
  revalidateAllTransactionsGetters()
}

export const updateTransactionGroupFromIdToId = async (transactionId: string, groupId: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').update({ group_id: groupId }).eq('id', transactionId)

  revalidateTransactions()
  revalidateAllTransactionsGetters()
}

export const deleteTransaction = async (id: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidateTransactions()
  revalidateAllTransactionsGetters()
}

export const deleteSelectedTransactions = async (ids: string[]) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const deletePromises = ids.map(async (id) => {
    await supabase.from('transactions').delete().eq('id', id)
  })

  Promise.all(deletePromises)

  revalidateTransactions()
  revalidateAllTransactionsGetters()
}
