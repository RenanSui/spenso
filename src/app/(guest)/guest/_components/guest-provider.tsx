'use client'

import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { transactionCategory, transactionType } from '@/config/dashboard'
import { mockProducts } from '@/lib/mocks'
import { positiveOrNegative } from '@/lib/utils'
import { CurrencyRates, Transaction, TransactionGroups } from '@/types'
import * as React from 'react'

export interface TransactionsContext {
  transactions: Transaction[]
  groups: TransactionGroups[]
  rates: (CurrencyRates | null)[]
  createTransaction: (transaction: Transaction) => void
  updateTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  createGroup: (group: TransactionGroups) => void
  updateGroup: (group: TransactionGroups) => void
  deleteGroup: (id: string) => void
}

export const TransactionsContext = React.createContext<TransactionsContext>({
  transactions: [],
  groups: [],
  rates: [],
  createTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  createGroup: () => {},
  updateGroup: () => {},
  deleteGroup: () => {},
})

export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([useRandomTransaction()])
  const [groups, setGroups] = React.useState<TransactionGroups[]>([useRandomGroup()])
  const [rates, setRates] = React.useState<(CurrencyRates | null)[]>([])

  React.useEffect(() => {
    const initialLoad = async () => {
      const rates = (await getAllTransactionsRates(transactions)) ?? []
      setRates(rates)
    }
    initialLoad()
  }, [transactions])

  const createTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction])
  }

  const updateTransaction = (transaction: Transaction) => {
    const index = transactions.findIndex((t) => t.id === transaction.id)
    if (index !== -1) {
      transactions[index] = transaction
      setTransactions([...transactions])
    }
  }

  const deleteTransaction = (id: string) => {
    const filteredTransactions = transactions.filter((t) => t.id !== id)
    setTransactions(filteredTransactions)
  }

  const createGroup = (group: TransactionGroups) => {
    setGroups([...groups, group])
  }

  const updateGroup = (group: TransactionGroups) => {
    const index = groups.findIndex((g) => g.id === group.id)
    if (index !== -1) {
      groups[index] = group
      setGroups([...groups])
    }
  }

  const deleteGroup = (id: string) => {
    const filteredGroups = groups.filter((g) => g.id !== id)
    setGroups(filteredGroups)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        groups,
        rates,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        createGroup,
        updateGroup,
        deleteGroup,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useRandomTransaction = () => {
  const products = mockProducts

  const date = new Date(new Date().valueOf() - Math.random() * 1e12)
  const amount = Number((Math.random() * 100000).toFixed(2))
  const type = transactionType[Math.floor(Math.random() * transactionType.length)]

  const transactionSchema = {
    id: String(Math.floor(Math.random() * 1000000000)),
    created_at: new Date(new Date().valueOf() - Math.random() * 1e12).toString(),
    product: products[Math.floor(Math.random() * 30)],
    date: date.toString(),
    amount: positiveOrNegative(type, amount),
    type,
    category: transactionCategory[Math.floor(Math.random() * transactionCategory.length)],
    user_id: 'user-1',
    year: date.getFullYear().toString(),
    currency: 'BRL',
    group_id: 'group-1',
  }

  return transactionSchema
}

const useRandomGroup = () => {
  const groupSchema: TransactionGroups = {
    created_at: new Date(new Date().valueOf() - Math.random() * 1e12).toString(),
    id: 'group-1',
    title: 'Global',
    user_id: 'user-1',
  }

  return groupSchema
}
