'use server'

import { createPublicServerClient, getSupabaseClient } from '@/lib/server'
import { sortTransactions } from '@/lib/transactions'
import { positiveOrNegative, removeArrayDuplicates } from '@/lib/utils'
import {
  TransactionCategories,
  TransactionInsert,
  TransactionTypeses,
  TransactionUpdate,
  TransactionYears,
} from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'

const revalidateAllTransactions = async () => {
  revalidateTag('get-transactions')
  revalidateTag('get-transactions-categories')
  revalidateTag('get-transactions-types')
  revalidateTag('get-transactions-years')
  revalidateTag('current-transaction-rates')
}

const getTransactions = cache(
  async () => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return null

    const { data } = await supabase.from('transactions').select('*')
    return data
  },
  [],
  { revalidate: false, tags: ['get-transactions'] },
)

const addTransaction = async (formData: TransactionInsert) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const formDataWithId = {
    ...formData,
    user_id: userId,
    amount: positiveOrNegative(formData.type, formData.amount),
  }

  await supabase.from('transactions').insert({ ...formDataWithId })

  revalidatePath('/dashboard/transactions/')
  revalidateAllTransactions()
}

const updateTransaction = async (formData: TransactionUpdate) => {
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

  revalidatePath('/dashboard/transactions')
  revalidateAllTransactions()
}

const deleteTransaction = async (id: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidatePath('/dashboard/transactions')
  revalidateAllTransactions()
}

const deleteSelectedTransactions = async (ids: string[]) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const deletePromises = ids.map(async (id) => {
    await supabase.from('transactions').delete().eq('id', id)
  })

  Promise.all(deletePromises)

  revalidatePath('/dashboard/transactions')
  revalidateAllTransactions()
}

const getTransactionsCategories = cache(
  async () => {
    const supabase = await createPublicServerClient()
    if (!supabase) return []

    const { data } = await supabase.from('transactions_categories').select('*')

    const categories: TransactionCategories[] = data ?? []
    return categories
  },
  [],
  { revalidate: false, tags: ['get-transactions-categories'] },
)

const getTransactionsTypes = cache(
  async () => {
    const supabase = await createPublicServerClient()
    if (!supabase) return []

    const { data } = await supabase.from('transactions_types').select('*')

    const types: TransactionTypeses[] = data ?? []
    return types
  },
  [],
  {
    revalidate: false,
    tags: ['get-transactions-types'],
  },
)

const getTransactionsYears = cache(
  async () => {
    const supabase = await createPublicServerClient()
    if (!supabase) return []

    const { data } = await supabase.from('transactions_years').select('*')

    const years: TransactionYears[] = data ?? []
    return years
  },
  [],
  { revalidate: false, tags: ['get-transactions-years'] },
)

const getTransactionCurrencies = cache(
  async () => {
    const transactions = await getTransactions()

    const newTransaction = sortTransactions(transactions)

    const allCurrencies = newTransaction?.map(({ currency }) => currency) ?? []

    const newCurrencies = removeArrayDuplicates(allCurrencies)

    return newCurrencies
  },
  [],
  {
    revalidate: false,
    tags: ['current-transaction-rates'],
  },
)

export {
  addTransaction,
  deleteSelectedTransactions,
  deleteTransaction,
  getTransactionCurrencies,
  getTransactions,
  getTransactionsCategories,
  getTransactionsTypes,
  getTransactionsYears,
  updateTransaction,
}
