import { createServerClient } from '@/lib/server/server'
import { getObjFromEntries } from '@/lib/utils'
import { Transaction } from '@/types/transactions'
import { getUser } from './user'

export const getTransactions = async () => {
  'use server'

  const supabase = await createServerClient()
  if (!supabase) return null

  const { data } = await supabase.from('transactions').select('*')

  const transactions: Transaction[] = data ?? []
  return transactions
}

export const addTransaction = async (formData: FormData) => {
  'use server'

  const supabase = await createServerClient()
  if (!supabase) return

  const form = getObjFromEntries(formData) as Transaction

  const transactionObj = {
    merchant_name: form.merchantName,
    product: form.product ?? '',
    transaction_date: form.date,
    amount: Number(form.amount).toFixed(2).toString(), // ((1390.99 - 750.85999999).toFixed(2))
    transaction_type: form.transactionType.toLocaleLowerCase(),
    category: form.category.toLocaleLowerCase(),
    description: form.description ?? '',
    user_id: (await getUser())?.id ?? '',
  }

  await supabase.from('transactions').insert({ ...transactionObj })
}

export const editTransaction = async (formData: FormData) => {
  'use server'

  const supabase = await createServerClient()
  if (!supabase) return null

  const form = getObjFromEntries(formData) as Transaction

  const transactionObj = {
    merchant_name: form.merchantName,
    product: form.product ?? '',
    transaction_date: form.date,
    amount: Number(form.amount).toFixed(2).toString(), // ((1390.99 - 750.85999999).toFixed(2))
    transaction_type: form.transactionType.toLocaleLowerCase(),
    category: form.category.toLocaleLowerCase(),
    description: form.description ?? '',
  }

  // make supabase fetch insert
}
