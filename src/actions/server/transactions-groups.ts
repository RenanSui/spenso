'use server'

import { getSupabaseClient } from '@/lib/server'
import { TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type GetTransactionGroupsProps = Promise<
  {
    created_at: string
    id: string
    title: string
    user_id: string | null
  }[]
>

export const revalidateTransactionsGroups = async () => {
  revalidateTag('get-transactions-group')
  revalidateTag('get-transactions-group-by-id')
}

export const getTransactionsGroup = cache(
  async (): GetTransactionGroupsProps => {
    const { supabase, userId } = await getSupabaseClient()
    if (!supabase) return []

    const data = (await supabase.from('transactions_groups').select('*')).data ?? []

    if (data.length === 0) {
      await addTransactionsGroup({ title: 'Global', user_id: userId })
      return getTransactionsGroup()
    }

    return data
  },
  [],
  { revalidate: false, tags: ['get-transactions-group'] },
)

export const getTransactionsGroupById = cache(
  async (id: string) => {
    const { supabase } = await getSupabaseClient()
    if (!supabase) return []

    const data = (await supabase.from('transactions_groups').select('*').eq('id', id)).data ?? []

    return data
  },
  [],
  { revalidate: false, tags: ['get-transactions-group-by-id'] },
)

export const addTransactionsGroup = async (formData: TransactionGroupsInsert) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  const formDataWithId = {
    ...formData,
    user_id: userId,
  }

  const { data, error } = await supabase
    .from('transactions_groups')
    .insert({ ...formDataWithId })
    .select()

  if (!error) {
    revalidatePath('/dashboard/transactions/')
    revalidateTransactionsGroups()
    redirect(`/dashboard/transactions/${data[0].id}?title=${data[0].title}`)
  }
}

export const updateTransactionsGroup = async (formData: TransactionGroupsUpdate) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id ?? '')

  revalidatePath('/dashboard/transactions')
  revalidateTransactionsGroups()
}

export const deleteTransactionsGroup = async (id: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidatePath('/dashboard/transactions')
  revalidateTransactionsGroups()
  await redirectToFirstTransactionGroup()
}

const redirectToFirstTransactionGroup = async () => {
  const transactionGroups = await getTransactionsGroup()
  redirect(`/dashboard/transactions/${transactionGroups[0].id}?title=${transactionGroups[0].title}`)
}
