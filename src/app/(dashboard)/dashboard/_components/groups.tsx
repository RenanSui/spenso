import { getTransactions } from '@/actions/server/transactions'
import { getGroups } from '@/actions/server/transactions-groups'
import { EmptyCard } from '@/components/empty-card'
import { GroupCard } from '@/components/group-card'

interface Groups {
  groupsPromise: ReturnType<typeof getGroups>
  transactionsPromise: ReturnType<typeof getTransactions>
  href?: string
}

export async function Groups({ groupsPromise, transactionsPromise, href }: Groups) {
  const groups = await groupsPromise
  const transactions = await transactionsPromise

  return (
    <>
      {groups && transactions && groups.length > 0 ? (
        groups.map((group) => {
          const groupTransactions = transactions.filter((transaction) => {
            return transaction.group_id === group.id
          })

          return (
            <GroupCard
              key={group.id}
              group={group}
              transactions={groupTransactions}
              href={href || `/dashboard/groups/${group.id}`}
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
