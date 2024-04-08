'use server'

import { getSupabaseClient, getSupabaseClientWithUser } from '@/lib/server'
import { TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { unstable_cache as cache, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type GetTransactionGroupsProps = Promise<
  {
    created_at: string
    id: string
    title: string
    user_id: string | null
  }[]
>

export const getTransactionsGroup = cache(
  async (): GetTransactionGroupsProps => {
    const supabase = await getSupabaseClient()
    if (!supabase) return []

    const data = (await supabase.from('transactions_groups').select('*')).data ?? []

    if (data.length === 0) {
      await addTransactionsGroup({ title: 'Global' })
      return getTransactionsGroup()
    }

    return data
  },
  [],
  { revalidate: false, tags: ['get-transactions-group'] },
)

export const getTransactionsGroupById = async (id: string) => {
  return (await getTransactionsGroup())?.find((group) => group.id === id) ?? null
}

export const addTransactionsGroup = async (formData: TransactionGroupsInsert) => {
  const { supabase, user } = await getSupabaseClientWithUser()
  if (!supabase || !user) return

  const formDataWithId = { ...formData, user_id: user.id }

  const { data, error } = await supabase
    .from('transactions_groups')
    .insert({ ...formDataWithId })
    .select('id')

  if (!error) {
    revalidateTag('get-transactions-group')
    redirect(`/dashboard/transactions/${data[0].id}?title=${formData.title}`)
  }
}

export const updateTransactionsGroup = async (formData: TransactionGroupsUpdate) => {
  const supabase = await getSupabaseClient()
  if (!supabase || !formData.id) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id)

  revalidateTag('get-transactions-group')
}

export const deleteTransactionsGroup = async (id: string) => {
  const supabase = await getSupabaseClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidateTag('get-transactions-group')
  await redirectToFirstTransactionGroup()
}

const redirectToFirstTransactionGroup = async () => {
  const transactionGroups = await getTransactionsGroup()
  redirect(`/dashboard/transactions/${transactionGroups[0].id}?title=${transactionGroups[0].title}`)
}
