import { getTransactions } from '@/actions/server/transactions'
import { getUser } from '@/actions/server/user'

export default async function Page() {
  const user = await getUser()
  const transactions = await getTransactions()

  return (
    <div className="">
      <h1 className="text-2xl">Transactions</h1>
      {/* <Link className={buttonVariants()} href="/">
        Home
      </Link> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}
    </div>
  )
}
