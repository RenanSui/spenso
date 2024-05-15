'use client'

import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { TransactionsContext } from '../../../_components/guest-provider'

type GroupPageProps = {
  params: {
    groupId: string
  }
}

export default function Page(params: GroupPageProps) {
  const groupId = params.params.groupId
  const guest = React.useContext(TransactionsContext)

  const group = guest.groups.find((group) => group.id === groupId)
  if (!group) notFound()

  const transactions = guest.transactions.filter((transaction) => transaction.group_id === groupId)
  const rates = guest.rates

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{group?.title}</h2>
      </div>

      <TransactionsTableShell
        groupId={groupId}
        data={transactions}
        rates={rates}
        addTransaction={guest.createTransaction}
        updateTransaction={guest.updateTransaction}
        updateTransactionGroup={guest.updateTransactionGroup}
        deleteTransaction={guest.deleteTransaction}
      />
    </div>
  )
}
