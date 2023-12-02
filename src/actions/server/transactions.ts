'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createServerClient } from '@/lib/server'
import { TransactionInsert, TransactionTypes, TransactionUpdate } from '@/types'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
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

  // make supabase fetch delete
  await supabase.from('transactions').delete().eq('id', id)
  revalidatePath('/dashboard/transactions')
}

export const deleteSelectedTransactions = async (ids: string[]) => {
  const supabase = await createServerClient()
  if (!supabase) return

  const userId = await getUserId()
  if (!userId) return

  const deletePromises = ids.map(async (id) => {
    await supabase.from('transactions').delete().eq('id', id)
  })

  Promise.all(deletePromises)

  revalidatePath('/dashboard/transactions')
}

export const getTransactionsCategories = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return []

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      db: { schema: 'public' },
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken ?? ''}`,
        },
      },
    },
  )
  if (!supabase) return []

  const userId = await getUserId()
  if (!userId) return []

  const { data } = await supabase.from('transactions_categories').select('*')

  return data as { category: string; sum: number }[]
}

export const getTransactionsTypes = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return []

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      db: { schema: 'public' },
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken ?? ''}`,
        },
      },
    },
  )
  if (!supabase) return []

  const userId = await getUserId()
  if (!userId) return []

  const { data } = await supabase.from('transactions_types').select('*')

  return data as { type: string; sum: number }[]
}

export const getTransactionsYears = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return []

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      db: { schema: 'public' },
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken ?? ''}`,
        },
      },
    },
  )
  if (!supabase) return []

  const userId = await getUserId()
  if (!userId) return []

  const { data } = await supabase.from('transactions_years').select('*')

  return data as { year: string; type: TransactionTypes; sum: number }[]
}
