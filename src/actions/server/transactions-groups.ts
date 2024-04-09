'use server'

import { authOptions } from '@/lib/auth'
import { getSupabaseServerClient, getSupabaseServerClientWithUser } from '@/lib/server'
import { TransactionGroups, TransactionGroupsInsert, TransactionGroupsUpdate } from '@/types'
import { getServerSession } from 'next-auth'
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type SupabaseCacheFn = {
  supabase: ReturnType<typeof getSupabaseServerClient>
  email: string | null | undefined
}

export async function getTransactionsGroup(supabaseCache?: SupabaseCacheFn): Promise<TransactionGroups[] | null> {
  const fnCache = supabaseCache || {
    supabase: getSupabaseServerClient(),
    email: (await getServerSession(authOptions))?.user.email,
  }

  return fnCache.email
    ? await cache(
        async () => {
          const supabase = await fnCache.supabase
          if (!supabase) return null

          const { data } = await supabase.from('transactions_groups').select('*')
          if (!data) return null

          if (data.length === 0) {
            await addTransactionsGroup({ title: 'Global' })
            return getTransactionsGroup(fnCache)
          }

          return data
        },
        [`transactions-group-${fnCache.email}`],
        { revalidate: false, tags: [`transactions-group-${fnCache.email}`] },
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
    revalidateGroup()
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

  revalidatePath(`/dashboard/transactions/${formData.id}`)
}

export async function deleteTransactionsGroup(id: string) {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return

  await supabase.from('transactions').delete().eq('group_id', id)
  await supabase.from('transactions_groups').delete().eq('id', id)

  revalidateGroup()
  redirect('/dashboard/transactions/')
}

async function revalidateGroup() {
  const session = await getServerSession(authOptions)
  const email = session?.user.email
  revalidateTag(`transactions-group-${email}`)
}
