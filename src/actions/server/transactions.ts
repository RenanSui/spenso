'use server'

import { createServerClient } from '@/lib/server/server'
import { TransactionInsert, TransactionUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { getUserId } from './user'

export const getTransactions = async () => {
  const supabase = await createServerClient()
  if (!supabase) return null

  const { data } = await supabase.from('transactions').select('*')
  return data
}

export const addTransaction = async (formData: TransactionInsert) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  const formDataWithId = {
    ...formData,
    user_id: userId,
  }

  await supabase.from('transactions').insert({ ...formDataWithId })
  revalidatePath('/dashboard/transactions')
}

export const updateTransaction = async (formData: TransactionUpdate) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  const { id, ...formDataObj } = formData

  await supabase
    .from('transactions')
    .update({ ...formDataObj })
    .eq('id', id ?? '')
  revalidatePath('/dashboard/transactions')
}

export const deleteTransaction = async (id: string) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  console.log(id)

  // make supabase fetch delete
  await supabase.from('transactions').delete().eq('id', id)
  revalidatePath('/dashboard/transactions')
}
