'use server'

import { getSupabaseClient } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import {
  TransactionCategories,
  TransactionInsert,
  TransactionTypeses,
  TransactionUpdate,
  TransactionYears,
} from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'

const revalidateTransactions = () => revalidatePath('/dashboard/transactions/')

export const revalidateAllTransactionsGetters = async () => {
  revalidateTag('get-transactions')
  revalidateTag('get-transactions-categories')
  revalidateTag('get-transactions-types')
  revalidateTag('get-transactions-years')
  revalidateTag('current-transaction-rates')

  // by id
  revalidateTag('get-transactions-by-id')
  revalidateTag('get-transactions-categories-by-group-id')
  revalidateTag('get-transactions-types-by-group-id')
  revalidateTag('get-transactions-years-by-group-id')
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
  async (groupId) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return null

    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('group_id', groupId)

    return data
  },
  [],
  {
    revalidate: false,
    tags: ['get-transactions-by-id'],
  },
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

  revalidateTransactions()
  revalidateAllTransactionsGetters()
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

export const updateTransactionGroupFromIdToId = async (
  transactionId: string,
  groupId: string,
) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase
    .from('transactions')
    .update({ group_id: groupId })
    .eq('id', transactionId)

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

export const getTransactionsCategories = cache(
  async () => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('category,currency,amount.sum()')
      .or('type.eq.expense')
      .order('category', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionCategories[]
  },
  [],
  { revalidate: false, tags: ['get-transactions-categories'] },
)

export const getTransactionsTypes = cache(
  async () => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('type,currency,amount.sum()')
      .order('type', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionTypeses[]
  },
  [],
  {
    revalidate: false,
    tags: ['get-transactions-types'],
  },
)

export const getTransactionsYears = cache(
  async () => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('year,currency,type,amount.sum()')
      .order('year', { ascending: false })
      .order('type', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionYears[]
  },
  [],
  { revalidate: false, tags: ['get-transactions-years'] },
)

export const getTransactionsCategoriesByGroupId = cache(
  async (groupId: string) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('category,currency,amount.sum()')
      .eq('group_id', groupId)
      .or('type.eq.expense')
      .order('category', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionCategories[]
  },
  [],
  { revalidate: false, tags: ['get-transactions-categories-by-group-id'] },
)

export const getTransactionsTypesByGroupId = cache(
  async (groupId: string) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('type,currency,amount.sum()')
      .eq('group_id', groupId)
      .order('type', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionTypeses[]
  },
  [],
  { revalidate: false, tags: ['get-transactions-types-by-group-id'] },
)

export const getTransactionsYearsByGroupId = cache(
  async (groupId: string) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const { data } = await supabase
      .from('transactions')
      .select('year,currency,type,amount.sum()')
      .eq('group_id', groupId)
      .order('year', { ascending: false })
      .order('type', { ascending: false })
      .order('currency', { ascending: false })

    return (data ?? []) as unknown as TransactionYears[]
  },
  [],
  { revalidate: false, tags: ['get-transactions-years-by-group-id'] },
)
