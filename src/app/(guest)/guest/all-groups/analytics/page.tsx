'use client'

import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import {
  getTransactionsCategories,
  getTransactionsTypes,
  getTransactionsYears,
} from '@/lib/transactions'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { TransactionsContext } from '../../_components/guest-provider'

export default function AnalyticsPage() {
  const { transactions, rates } = React.useContext(TransactionsContext)
  if (!transactions) notFound()

  const years = getTransactionsYears(transactions)
  const types = getTransactionsTypes(transactions)
  const categories = getTransactionsCategories(transactions)

  return (
    <div className="space-y-6">
      <TransactionAnalyticsShell
        transactions={transactions}
        categories={categories}
        types={types}
        years={years}
        allRates={rates}
      />
    </div>
  )
}
