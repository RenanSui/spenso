'use client'

import * as React from 'react'
import { TransactionsContext } from '../../_components/guest-provider'
import { GuestTransactionsTableShell } from '../../_components/guest-transactions-table-shell'

export default function TransactionsPage() {
  const { transactions, rates } = React.useContext(TransactionsContext)

  return (
    <div className="space-y-6">
      <GuestTransactionsTableShell data={transactions} rates={rates} />
    </div>
  )
}
