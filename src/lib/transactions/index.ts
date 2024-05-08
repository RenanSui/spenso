import {
  CurrencyRates,
  Transaction,
  TransactionCategories,
  TransactionTypes,
  TransactionTypeses,
  TransactionYears,
} from '@/types'

export const sortRecentTransactions = (transactions: Transaction[]): Transaction[] => {
  return transactions
    .sort((item1, item2) => {
      return new Date(item1.date).getTime() - new Date(item2.date).getTime()
    })
    .reverse()
}

export const getCurrencyValue = (
  value: number,
  currency: string,
  rates: (CurrencyRates | null)[],
  currencyState: string,
) => {
  const transactionRates = rates.find((item) => item?.base === currency)
  const currencyRate = transactionRates?.rates[currencyState] ?? 1
  return parseFloat((value * currencyRate).toFixed(2))
}

export const getTransactionsTypes = (transactions: Transaction[]) => {
  const transactionsTypesMap = new Map<string, TransactionTypeses>()

  transactions.forEach((transaction) => {
    const { type, currency } = transaction
    const key = `${type}-${currency}`

    let group = transactionsTypesMap.get(key)

    if (!group) {
      group = { type, currency, sum: 0 }
      transactionsTypesMap.set(key, group)
    }

    group.sum += transaction.amount
  })

  return Array.from(transactionsTypesMap.values())
}

export const getTransactionsCategories = (transactions: Transaction[]) => {
  const newTransactions = transactions.filter((item) => item.type.toLowerCase() === 'expense')
  const categoriesMap = new Map<string, TransactionCategories>()

  newTransactions.forEach((transaction) => {
    const { category, currency } = transaction
    const key = `${category}-${currency}`

    let group = categoriesMap.get(key)

    if (!group) {
      group = { category, currency, sum: 0 }
      categoriesMap.set(key, group)
    }

    group.sum += transaction.amount
  })

  return Array.from(categoriesMap.values())
}

export const getTransactionsYears = (transactions: Transaction[]) => {
  const newTransactions = transactions.toSorted((item1, item2) => Number(item1.year) - Number(item2.year))
  const yearsMap = new Map<string, TransactionYears>()

  newTransactions.forEach((transaction) => {
    const { year, currency, type } = transaction
    const key = `${year}-${currency}-${type}`

    let group = yearsMap.get(key)

    if (!group) {
      group = { year, currency, type: type as TransactionTypes, sum: 0 }
      yearsMap.set(key, group)
    }

    group.sum = transaction.amount
  })

  return Array.from(yearsMap.values())
}
