import { getTransactionsGroup } from '@/actions/server/transactions-groups'
import { redirect } from 'next/navigation'

export default async function Page() {
  const transactionsGroup = await getTransactionsGroup()

  if (!transactionsGroup || transactionsGroup.length === 0) redirect('/')

  redirect(`/dashboard/transactions/${transactionsGroup[0].id}?title=${transactionsGroup[0].title}`)
}
