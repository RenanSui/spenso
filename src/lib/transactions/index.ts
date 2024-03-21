import { CurrencyRates, Transaction } from '@/types'
import { removeArrayDuplicates } from '../utils'

export const sortTransactions = (transactions: Transaction[] | null) => {
  const newTransaction = transactions
    ?.sort((item1, item2) => {
      return item1.created_at.localeCompare(item2.created_at)
    })
    .reverse()

  return newTransaction ?? []
}

// export const getCurrencies = () => {}
export const getRate = async (currency: string) => {
  const url = `https://api.fxratesapi.com/latest?base=${currency}`

  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } })

  const rate = (await res.json()) as CurrencyRates

  return rate
}

export const getAllRates = async (newTransaction: Transaction[] | null) => {
  const allCurrencies = newTransaction?.map(({ currency }) => currency) ?? []
  const newCurrencies = removeArrayDuplicates(allCurrencies)

  const allRates = await Promise.all(
    newCurrencies.map(async (currency) => await getRate(currency)),
  )

  return allRates
}
