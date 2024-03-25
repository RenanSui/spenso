'use server'

import { removeArrayDuplicates } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { unstable_cache as cache } from 'next/cache'

export const getRate = cache(
  async (currency: string) => {
    const url = `https://api.fxratesapi.com/latest?base=${currency}`

    // const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } })
    const res = await fetch(url)

    const rate = (await res.json()) as CurrencyRates

    return rate
  },
  [],
  { revalidate: 60 * 60 * 24, tags: ['get-rate'] },
)

export const getAllTransactionsRates = async (newTransaction: Transaction[] | null) => {
  const allCurrencies = newTransaction?.map(({ currency }) => currency) ?? []
  const newCurrencies = removeArrayDuplicates(allCurrencies)

  const allRates = await Promise.all(
    newCurrencies.map(async (currency) => await getRate(currency)),
  )

  return allRates
}

// export const getTransactionCurrencies = cache(
//   async () => {
//     const transactions = await getTransactions()

//     const newTransaction = sortTransactions(transactions)

//     const allCurrencies = newTransaction?.map(({ currency }) => currency) ?? []

//     const newCurrencies = removeArrayDuplicates(allCurrencies)

//     return newCurrencies
//   },
//   [],
//   {
//     revalidate: false,
//     tags: ['current-transaction-rates'],
//   },
// )
