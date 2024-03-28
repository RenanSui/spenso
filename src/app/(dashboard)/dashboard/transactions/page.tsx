import { getTransactionsGroup } from '@/actions/server/transactions-groups'
import { redirect } from 'next/navigation'

export default async function Page() {
  const transactionGroup = await getTransactionsGroup()

  redirect(`/dashboard/transactions/${transactionGroup[0].id}?title=${transactionGroup[0].title}`)
}
