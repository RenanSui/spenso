'use server'

import { authOptions } from '@/lib/auth'
import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { TransactionGroups, TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { getServerSession } from 'next-auth'
import { unstable_cache as cache, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getTransactionsGroup(): Promise<TransactionGroups[] | null> {
  const session = await getServerSession(authOptions)
  const email = session?.user.email

  return email
    ? await cache(
        async () => {
          const supabase = await getSupabaseServerClient()
          if (!supabase) return null

          const { data } = await supabase.from('transactions_groups').select('*')
          if (!data) return null

          if (data.length === 0) {
            await addTransactionsGroup({ title: 'Global' })
            return getTransactionsGroup()
          }

          return data
        },
        [`transactions-group-${email}`],
        { revalidate: false, tags: [`transactions-group-${email}`] },
      )()
    : null
}

export async function getTransactionsGroupById(id: string) {
  const transactionsGroup = await getTransactionsGroup()
  return transactionsGroup?.find((group) => group.id === id)
}

export async function addTransactionsGroup(formData: TransactionGroupsInsert) {
  const { supabase, user } = await getSupabaseServerClientWithUser()
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

export async function updateTransactionsGroup(formData: TransactionGroupsUpdate) {
  const supabase = await getSupabaseServerClient()
  if (!supabase || !formData.id) return

  await supabase
    .from('transactions_groups')
    .update({ ...formData })
    .eq('id', formData.id)

  revalidateTag('get-transactions-group')
}

export async function deleteTransactionsGroup(id: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidateTag('get-transactions-group')
  redirect('/')
}

// async function redirectToFirstTransactionsGroup() {
//   const transactionsGroup = await getTransactionsGroup()
//   if (!transactionsGroup) redirect('/')
// }
