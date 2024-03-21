'use server'

import { getTransactions } from '@/actions/server/transactions'
import { unstable_cache as cache, revalidateTag } from 'next/cache'
import { sortTransactions } from '.'
import { removeArrayDuplicates } from '../utils'

export const getTransactionCurrencies = cache(
  async () => {
    const transactions = await getTransactions()

    const newTransaction = sortTransactions(transactions)

    const allCurrencies = newTransaction?.map(({ currency }) => currency) ?? []

    const newCurrencies = removeArrayDuplicates(allCurrencies)

    const date = new Date().toISOString()

    console.log(date)

    return newCurrencies
  },
  [],
  {
    revalidate: false,
    tags: ['current-transaction-rates'],
  },
)

export const revalidateTransactionRates = () => {
  revalidateTag('current-transaction-rates')
}
