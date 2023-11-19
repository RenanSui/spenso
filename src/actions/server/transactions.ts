'use server'

import { createServerClient } from '@/lib/server/server'
import { Transaction, TransactionForm } from '@/types'
import { revalidatePath } from 'next/cache'
import { getUserId } from './user'

export const getTransactions = async () => {
  const supabase = await createServerClient()
  if (!supabase) return null

  const { data } = await supabase.from('transactions').select('*')
  return (data as Transaction[]) ?? []
}

export const addTransaction = async (formData: TransactionForm) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  const { amount, ...formDataObj } = formData
  const formDataWithId = {
    ...formDataObj,
    amount: Number(amount.toFixed(2)),
    user_id: userId,
  }

  await supabase.from('transactions').insert({ ...formDataWithId })
  revalidatePath('/dashboard/transactions')
}

export const editTransaction = async (formData: TransactionForm) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  const { amount, ...formDataObj } = formData
  const formDataWithId = {
    ...formDataObj,
    amount: Number(amount.toFixed(2)),
  }

  // make supabase fetch update
  revalidatePath('/dashboard/transactions')
}

export const deleteTransaction = async (id: string) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  console.log(id)

  // make supabase fetch delete
  revalidatePath('/dashboard/transactions')
}
