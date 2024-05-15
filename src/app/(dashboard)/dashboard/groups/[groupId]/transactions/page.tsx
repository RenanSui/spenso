import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { deleteTransaction, getTransactionsByGroupId, updateTransactionGroup } from '@/actions/server/transactions'
import { getGroupById } from '@/actions/server/transactions-groups'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { notFound } from 'next/navigation'

type GroupPageProps = {
  params: {
    groupId: string
  }
}

async function getGroupFromParmas(params: GroupPageProps) {
  const groupId = params.params.groupId

  const group = await getGroupById(groupId)

  if (!group) return null

  return group
}

export default async function Page(params: GroupPageProps) {
  const group = await getGroupFromParmas(params)
  if (!group) notFound()

  const transactions = await getTransactionsByGroupId(group.id)
  if (!transactions) notFound()

  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
      </div>
      <TransactionsTableShell
        groupId={group.id}
        data={transactions}
        rates={allRates}
        deleteTransaction={deleteTransaction}
        updateTransactionGroup={updateTransactionGroup}
      />
    </div>
  )
}
