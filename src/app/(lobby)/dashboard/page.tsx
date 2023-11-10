import { getTransactions } from '@/actions/server/transactions'
import { getUser } from '@/actions/server/user'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  const user = await getUser()
  const transactions = await getTransactions()

  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <Link className={buttonVariants()} href="/">
        Home
      </Link>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  )
}
