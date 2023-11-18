import { getTransactions } from '@/actions/server/transactions'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'

export default async function Page() {
  const data = await getTransactions()

  const transactions = data
    ? [
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
      ]
    : null

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Transactions</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your transactions
        </PageHeaderDescription>
      </PageHeader>

      {/* <TransactionsTableShell data={transactions ?? []} /> */}

      {/* <div className="flex justify-between">
        <h1 className="text-2xl">Transactions</h1>
        <Button className="md:hidden">New</Button>
      </div> */}

      {/* <div className="hidden md:block">
        {transactions ? (
          <TransactionTable columns={TransactionColumns} data={transactions} />
        ) : null}
      </div> */}

      {/* <div className="my-4 md:hidden">
        {transactions ? <TransactionCard data={transactions} /> : null}
      </div> */}

      {/* <pre>{JSON.stringify({ userId }, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
    </Shell>
  )
}
