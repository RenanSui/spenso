'use client'

import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import * as React from 'react'
import { TransactionsContext } from '../../_components/guest-provider'

export default function TransactionsPage() {
  const { transactions, rates } = React.useContext(TransactionsContext)

  return (
    <div className="space-y-6">
      <TransactionsTableShell data={transactions} rates={rates} />
    </div>
  )
}
