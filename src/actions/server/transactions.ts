'use server'

import { createPublicServerClient, getSupabaseClient } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import {
  TransactionCategories,
  TransactionInsert,
  TransactionTypeses,
  TransactionUpdate,
  TransactionYears,
} from '@/types'
import { revalidatePath } from 'next/cache'

const getTransactions = async () => {
  const { supabase } = await getSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase.from('transactions').select('*')
  return data
}

const addTransaction = async (formData: TransactionInsert) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const formDataWithId = {
    ...formData,
    user_id: userId,
    amount: positiveOrNegative(formData.type, formData.amount),
  }

  await supabase.from('transactions').insert({ ...formDataWithId })

  revalidatePath('/dashboard/transactions')
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
}

const deleteTransaction = async (id: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidatePath('/dashboard/transactions')
}

const deleteSelectedTransactions = async (ids: string[]) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const deletePromises = ids.map(async (id) => {
    await supabase.from('transactions').delete().eq('id', id)
  })

  Promise.all(deletePromises)

  revalidatePath('/dashboard/transactions')
}

const getTransactionsCategories = async () => {
  const supabase = await createPublicServerClient()
  if (!supabase) return []

  const { data } = await supabase.from('transactions_categories').select('*')

  const categories: TransactionCategories[] = data ?? []
  return categories
}

const getTransactionsTypes = async () => {
  const supabase = await createPublicServerClient()
  if (!supabase) return []

  const { data } = await supabase.from('transactions_types').select('*')

  const types: TransactionTypeses[] = data ?? []
  return types
}

const getTransactionsYears = async () => {
  const supabase = await createPublicServerClient()
  if (!supabase) return []

  const { data } = await supabase.from('transactions_years').select('*')

  const years: TransactionYears[] = data ?? []
  return years
}

export {
  addTransaction,
  deleteSelectedTransactions,
  deleteTransaction,
  getTransactions,
  getTransactionsCategories,
  getTransactionsTypes,
  getTransactionsYears,
  updateTransaction,
}
