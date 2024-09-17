'use client'

import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import { getTransactionsCategories, getTransactionsTypes, getTransactionsYears } from '@/lib/transactions'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { TransactionsContext } from '../../../_components/guest-provider'

type GroupPageProps = {
  params: {
    groupId: string
  }
}

export default function AnalyticsPage(params: GroupPageProps) {
  const groupId = params.params.groupId
  const guest = React.useContext(TransactionsContext)

  const transactions = guest.transactions.filter((transaction) => transaction.group_id === groupId)
  if (!transactions) notFound()

  const rates = guest.rates
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
