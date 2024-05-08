import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactionsById } from '@/actions/server/transactions'
import { getGroupById } from '@/actions/server/transactions-groups'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import { getTransactionsCategories, getTransactionsTypes, getTransactionsYears } from '@/lib/transactions'
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

  const transactions = await getTransactionsById(group.id)
  if (!transactions) notFound()

  const years = getTransactionsYears(transactions)
  const types = getTransactionsTypes(transactions)
  const categories = getTransactionsCategories(transactions)
  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
      </div>
      <TransactionAnalyticsShell
        transactions={transactions}
        categories={categories}
        types={types}
        years={years}
        allRates={allRates}
      />
    </div>
  )
}
