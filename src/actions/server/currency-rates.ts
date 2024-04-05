'use server'

import { removeArrayDuplicates } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { unstable_cache as cache } from 'next/cache'

export const getRate = cache(
  async (currency: string) => {
    const url = `https://api.fxratesapi.com/latest?base=${currency.toUpperCase()}`
    const res = await fetch(url)
    const rate = (await res.json()) as CurrencyRates
    return rate
  },
  [],
  { revalidate: false, tags: ['get-rates'] },
)

export const getAllTransactionsRates = async (newTransaction: Transaction[] | null) => {
  if (!newTransaction) return null

  const allCurrencies = newTransaction.map(({ currency }) => currency)
  const newCurrencies = removeArrayDuplicates(allCurrencies)
  const allRates = await Promise.all(newCurrencies.map(async (currency) => await getRate(currency)))
  return allRates
}

// export const getAllTransactionsRates = async () => {
//   const transactions = await getTransactions()
//   if (!transactions) return null

//   const allCurrencies = transactions.map(({ currency }) => currency) ?? []
//   const newCurrencies = removeArrayDuplicates(allCurrencies)

//   const allRates: CurrencyRates[] | null = await Promise.all(
//     newCurrencies.map(async (currency) => {
//       const url = `https://api.fxratesapi.com/latest?base=${currency}`
//       const res = await fetch(url)
//       const rate = (await res.json()) as CurrencyRates
//       return rate
//     }),
//   )

//   return allRates
// }

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
