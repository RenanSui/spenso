'use client'

import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { transactionCategory, transactionType } from '@/config/dashboard'
import { mockProducts } from '@/lib/mocks'
import { positiveOrNegative } from '@/lib/utils'
import {
  CurrencyRates,
  Transaction,
  TransactionGroups,
  TransactionGroupsInsert,
  TransactionInsert,
  TransactionUpdate,
} from '@/types'
import { PostgrestError } from '@supabase/supabase-js'
import * as React from 'react'

export interface TransactionsContext {
  transactions: Transaction[]
  groups: TransactionGroups[]
  rates: (CurrencyRates | null)[]
  createTransaction: (transaction: TransactionInsert) => void
  updateTransaction: (transaction: TransactionUpdate) => void
  updateTransactionGroup: (
    transactionId: string,
    oldGroupId: string,
    newGroupId: string,
  ) => void
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
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    useRandomTransaction(),
  ])
  const [groups, setGroups] = React.useState<TransactionGroups[]>([
    useRandomGroup(),
  ])
  const [rates, setRates] = React.useState<(CurrencyRates | null)[]>([])

  React.useEffect(() => {
    const initialLoad = async () => {
      const rates = (await getAllTransactionsRates(transactions)) ?? []
      setRates(rates)
    }
    initialLoad()
  }, [transactions])

  const createTransaction = (transaction: TransactionInsert) => {
    const formattedTransaction: Transaction = {
      product: transaction.product ?? '',
      date: transaction.date ?? '',
      amount: transaction.type
        ? positiveOrNegative(transaction.type, transaction.amount)
        : 0,
      type: transaction.type ?? '',
      category:
        transaction.category ??
        transactionCategory[
          Math.floor(Math.random() * transactionCategory.length)
        ],
      year: transaction.date
        ? new Date(transaction.date).getFullYear().toString()
        : '',
      currency: transaction.currency ?? '',
      group_id: transaction.group_id ?? '',
      // random
      id: String(Math.floor(Math.random() * 1000000000)),
      created_at: new Date(
        new Date().valueOf() - Math.random() * 1e12,
      ).toString(),
      user_id: 'user-1',
    }

    console.log({ formattedTransaction })

    setTransactions([...transactions, formattedTransaction])
  }

  const updateTransaction = (transaction: TransactionUpdate) => {
    const index = transactions.findIndex((t) => t.id === transaction.id)
    if (index !== -1) {
      const formattedTransaction: Transaction = {
        product: transaction.product ?? '',
        date: transaction.date ?? '',
        amount: transaction.amount ?? 0,
        type: transaction.type ?? '',
        category: transaction.category ?? '',
        year: transaction.date ?? '',
        currency: transaction.currency ?? '',
        group_id: transaction.group_id ?? '',
        id: transaction.id ?? '',
        created_at: transaction.created_at ?? '',
        user_id: transaction.user_id ?? '',
      }

      transactions[index] = formattedTransaction
      setTransactions([...transactions])
    }
  }

  const updateTransactionGroup = (
    transactionId: string,
    oldGroupId: string,
    newGroupId: string,
  ) => {
    const index = transactions.findIndex((t) => t.id === transactionId)
    if (index !== -1) {
      const transaction = transactions[index]
      transactions[index] = { ...transaction, group_id: newGroupId }
      setTransactions([...transactions])
    }
  }

  const deleteTransaction = (id: string) => {
    const filteredTransactions = transactions.filter((t) => t.id !== id)
    setTransactions(filteredTransactions)
  }

  const createGroup = (group: TransactionGroupsInsert) => {
    const formattedGroup: TransactionGroups = {
      id: group.id ?? String(Math.floor(Math.random() * 1000000000)),
      created_at:
        group.created_at ??
        new Date(new Date().valueOf() - Math.random() * 1e12).toString(),
      title: group.title ?? 'Global Placeholder',
      user_id: group.user_id ?? String(Math.floor(Math.random() * 1000000000)),
    }

    setGroups([...groups, formattedGroup])

    return Promise.resolve({ data: [formattedGroup], error: null })
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
  const products = mockProducts

  const date = new Date(new Date().valueOf() - Math.random() * 1e12)
  const amount = Number((Math.random() * 100000).toFixed(2))
  const type =
    transactionType[Math.floor(Math.random() * transactionType.length)]

  const transactionSchema = {
    id: String(Math.floor(Math.random() * 1000000000)),
    created_at: new Date(
      new Date().valueOf() - Math.random() * 1e12,
    ).toString(),
    product: products[Math.floor(Math.random() * 30)],
    date: date.toString(),
    amount: positiveOrNegative(type, amount),
    type,
    category:
      transactionCategory[
        Math.floor(Math.random() * transactionCategory.length)
      ],
    user_id: 'user-1',
    year: date.getFullYear().toString(),
    currency: 'BRL',
    group_id: 'group-1',
  }

  return transactionSchema
}

const useRandomGroup = () => {
  const groupSchema: TransactionGroups = {
    created_at: new Date(
      new Date().valueOf() - Math.random() * 1e12,
    ).toString(),
    id: 'group-1',
    title: 'Global',
    user_id: 'user-1',
  }

  return groupSchema
}
