import { Transaction } from '@/types'

export const sortTransactions = (transactions: Transaction[] | null) => {
  const newTransaction = transactions
    ?.sort((item1, item2) => {
      return item1.created_at.localeCompare(item2.created_at)
    })
    .reverse()

  return newTransaction ?? []
}
