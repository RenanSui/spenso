import { getTransactions } from '@/actions/server/transactions'
import { getGroups } from '@/actions/server/transactions-groups'
import { GroupCard } from '@/components/group-card'

interface Groups {
  groupsPromise: ReturnType<typeof getGroups>
}

export async function Groups({ groupsPromise }: Groups) {
  const groups = await groupsPromise
  const transactions = await getTransactions()

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
              href={`/dashboard/groups/${group.id}`}
            />
          )
        })
      ) : (
        <div></div>
        // <EmptyCard
        //   icon="store"
        //   title="No groups found"
        //   description="Add a new group to manage your transactions"
        //   className="col-span-full"
        // />
      )}
    </>
  )
}
