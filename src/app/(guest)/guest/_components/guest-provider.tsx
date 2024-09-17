'use client'

import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { type getTransactions } from '@/actions/server/transactions'
import { type getGroups } from '@/actions/server/transactions-groups'
import { products } from '@/assets/data/products'
import { transactionCategory, transactionType } from '@/config/dashboard'
import { generateRandomPastDate, getRandomElement, positiveOrNegative } from '@/lib/utils'
import {
  type CurrencyRates,
  type Transaction,
  type TransactionGroups,
  type TransactionGroupsInsert,
  type TransactionInsert,
  type TransactionUpdate,
} from '@/types'
import { type PostgrestError } from '@supabase/supabase-js'
import * as React from 'react'

export type TransactionsPromise = ReturnType<typeof getTransactions> | null
export type GroupsPromise = ReturnType<typeof getGroups> | null

export interface TransactionsContext {
  transactions: Transaction[]
  groups: TransactionGroups[]
  rates: (CurrencyRates | null)[]
  createTransaction: (transaction: TransactionInsert) => void
  updateTransaction: (transaction: TransactionUpdate) => void
  updateTransactionGroup: (transactionId: string, oldGroupId: string, newGroupId: string) => void
  deleteTransaction: (id: string) => void
  createGroup: (group: TransactionGroupsInsert) => Promise<{
    data: TransactionGroups[] | null
    error: PostgrestError | null
  }>
  updateGroup: (group: TransactionGroups) => void
  deleteGroup: (id: string) => void
}

export const TransactionsContext = React.createContext<TransactionsContext>({
  transactions: [],
  groups: [],
  rates: [],
  createTransaction: () => {},
  updateTransaction: () => {},
  updateTransactionGroup: () => {},
  deleteTransaction: () => {},
  createGroup: () => Promise.resolve({ data: null, error: null }),
  updateGroup: () => {},
  deleteGroup: () => {},
})

export const GuestProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([useRandomTransaction()])
  const [groups, setGroups] = React.useState<TransactionGroups[]>([generateRandomGroup()])
  const [rates, setRates] = React.useState<(CurrencyRates | null)[]>([])

  // Effect for loading initial transactions and groups
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const initialRates = (await getAllTransactionsRates(transactions)) ?? []
        setRates(initialRates)
      } catch (error) {
        console.error('Error loading rates:', error)
      }
    }

    loadData()
      .then(() => {})
      .catch(() => {})
  }, [transactions])

  const createTransaction = (transaction: TransactionInsert) => {
    const formattedTransaction: Transaction = {
      ...transaction,
      user_id: 'user-1',
      created_at: generateRandomPastDate(1),
      currency: transaction.currency ?? '0',
      id: String(Math.floor(Math.random() * 1e9)),
      group_id: transaction.group_id ?? 'group-1',
      year: transaction.date ? new Date(transaction.date).getFullYear().toString() : '',
      amount: transaction.type ? positiveOrNegative(transaction.type, transaction.amount) : 0,
    }

    setTransactions((prev) => [...prev, formattedTransaction])
  }

  const updateTransaction = (transaction: TransactionUpdate) => {
    setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? { ...t, ...transaction } : t)))
  }

  const updateTransactionGroup = (transactionId: string, newGroupId: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === transactionId ? { ...t, group_id: newGroupId } : t)))
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const createGroup = async (group: TransactionGroupsInsert) => {
    const formattedGroup: TransactionGroups = {
      id: group.id ?? String(Math.floor(Math.random() * 1e9)),
      created_at: generateRandomPastDate(1),
      title: group.title ?? 'Global Placeholder',
      user_id: group.user_id ?? String(Math.floor(Math.random() * 1e9)),
    }

    setGroups((prev) => [...prev, formattedGroup])

    return { data: [formattedGroup], error: null }
  }

  const updateGroup = (group: TransactionGroups) => {
    setGroups((prev) => prev.map((g) => (g.id === group.id ? { ...g, ...group } : g)))
  }

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        groups,
        rates,
        createTransaction,
        updateTransaction,
        updateTransactionGroup,
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
  // Generate random date and amount
  const date = new Date(Date.now() - Math.random() * 1e12)
  const amount = Number((Math.random() * 100000).toFixed(2))

  // Get random elements with fallback
  const product = getRandomElement(products, 'Key Holder')
  const type = getRandomElement(transactionType, 'income')
  const category = getRandomElement(transactionCategory, 'miscellaneous')

  const transactionSchema: Transaction = {
    type,
    product,
    category,
    currency: 'BRL',
    user_id: 'user-1',
    group_id: 'group-1',
    date: date.toString(),
    year: date.getFullYear().toString(),
    created_at: generateRandomPastDate(100),
    amount: positiveOrNegative(type, amount),
    id: String(Math.floor(Math.random() * 1e9)),
  }

  return transactionSchema
}

const generateRandomGroup = ({
  id = 'group-1',
  title = 'Global',
  user_id = 'user-1',
  yearsBack = 1,
}: {
  id?: string
  title?: string
  user_id?: string
  yearsBack?: number
} = {}): TransactionGroups => {
  const groupSchema: TransactionGroups = {
    created_at: generateRandomPastDate(yearsBack),
    id,
    title,
    user_id,
  }

  return groupSchema
}
