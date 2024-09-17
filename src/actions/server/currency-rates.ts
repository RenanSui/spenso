'use server'

import { removeArrayDuplicates } from '@/lib/utils'
import { type CurrencyRates, type Transaction } from '@/types'
import { unstable_cache as cache } from 'next/cache'

export async function getRate(currency: string) {
  return await cache(
    async () => {
      const url = `https://api.fxratesapi.com/latest?base=${currency.toUpperCase()}`
      const response = await fetch(url)

      if (!response.ok) return null

      const rate = (await response.json()) as CurrencyRates
      return rate
    },
    [`rates-${currency}`],
    { revalidate: 60 * 60 * 24, tags: [`rates-${currency}`] },
  )()
}

export const getAllTransactionsRates = async (newTransaction: Transaction[] | null) => {
  if (!newTransaction) return null

  const allCurrencies = newTransaction.map(({ currency }) => currency)
  const newCurrencies = removeArrayDuplicates(allCurrencies)
  const allRates = await Promise.all(newCurrencies.map(async (currency) => await getRate(currency)))
  return allRates
}
