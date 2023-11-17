import { getTransactions } from '@/actions/server/transactions'
import { getUserId } from '@/actions/server/user'
import { TransactionCard } from '@/components/transactions/transaction-card'
import { TransactionColumns } from '@/components/transactions/transaction-columns'
import { TransactionTable } from '@/components/transactions/transaction-table'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const userId = await getUserId()
  const transactions = await getTransactions()

  return (
    <section className="my-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Transactions</h1>
        <Button className="md:hidden">New</Button>
      </div>

      <div className="hidden md:block">
        {transactions ? (
          <TransactionTable columns={TransactionColumns} data={transactions} />
        ) : null}
      </div>

      <div className="my-4 md:hidden">
        {transactions ? <TransactionCard data={transactions} /> : null}
      </div>

      {/* <pre>{JSON.stringify({ userId }, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
    </section>
  )
}
