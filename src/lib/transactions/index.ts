import { CurrencyRates, Transaction } from '@/types'

export const sortTransactions = (transactions: Transaction[] | null) => {
  const newTransaction = transactions
    ?.sort((item1, item2) => {
      return item1.created_at.localeCompare(item2.created_at)
    })
    .reverse()

  return newTransaction ?? []
}

export const returnCalculatedValue = (
  value: number,
  currency: string,
  rates: CurrencyRates[],
  currencyState: string,
) => {
  const transactionRates = rates.find((item) => item.base === currency)
  const currencyRate = transactionRates?.rates[currencyState] ?? 1
  const newAmount = parseFloat((value * currencyRate).toFixed(2))
  return newAmount
}
