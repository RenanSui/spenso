import { EmptyCard } from '@/components/empty-card'
import { Transaction, TransactionGroups } from '@/types'
import { GuestGroupCard } from './guest-group-card'

interface GuestGroupsProps {
  groups: TransactionGroups[]
  transactions: Transaction[]
  href?: string
}

export function GuestGroups({ groups, transactions, href }: GuestGroupsProps) {
  return (
    <>
      {groups && transactions && groups.length > 0 ? (
        groups.map((group) => {
          const groupTransactions = transactions.filter((transaction) => {
            return transaction.group_id === group.id
          })

          return (
            <GuestGroupCard
              key={group.id}
              group={group}
              transactions={groupTransactions}
              href={href || `/guest/groups/${group.id}`}
            />
          )
        })
      ) : (
        <EmptyCard
          icon="dashboardIcon"
          title="No groups found"
          description="Add a new group to manage your transactions"
          className="col-span-full"
        />
      )}
    </>
  )
}
