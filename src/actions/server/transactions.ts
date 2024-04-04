'use server'

import { getSupabaseClient } from '@/lib/server'
import { positiveOrNegative } from '@/lib/utils'
import { Transaction, TransactionInsert, TransactionUpdate } from '@/types'
import { unstable_cache as cache, revalidatePath } from 'next/cache'

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

  revalidatePath(`/dashboard/transactions/${formData.group_id}`)
  revalidatePath(`/dashboard/analytics`)
}

export const updateTransactionGroup = async (transactionId: string, oldGroupId: string, newGroupId: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').update({ group_id: newGroupId }).eq('id', transactionId)

  revalidatePath(`/dashboard/transactions/${oldGroupId}`)
  revalidatePath(`/dashboard/transactions/${newGroupId}`)
  revalidatePath(`/dashboard/analytics`)
}

export const deleteTransaction = async (id: string, groupId?: string) => {
  const { supabase, userId } = await getSupabaseClient()
  if (!(supabase && userId)) return

  await supabase.from('transactions').delete().eq('id', id)

  revalidatePath(`/dashboard/transactions/${groupId}`)
  revalidatePath(`/dashboard/analytics`)
}

// export const deleteSelectedTransactions = async (ids: { id: string; groupId: string }[]) => {
//   // const { supabase, userId } = await getSupabaseClient()
//   // if (!(supabase && userId)) return

//   // const deletePromises = ids.map(async (id) => {
//   //   await supabase.from('transactions').delete().eq('id', id)
//   // })

//   // console.log({ids})
//   // const deletePromises = ids.map(async ({ id, groupId }) => await deleteTransaction(id, groupId))
//   // Promise.all(deletePromises)

//   // revalidateTransactions()
//   // revalidateAllTransactionsGetters()

//   ids.forEach(async ({ groupId, id }) => {
//     await deleteTransaction(id, groupId)
//     // revalidatePath(`/dashboard/transactions/${groupId}`)
//   })

//   revalidatePath(`/dashboard/transactions/${ids[0].}`)
//   revalidatePath(`/dashboard/analytics`)
// }
