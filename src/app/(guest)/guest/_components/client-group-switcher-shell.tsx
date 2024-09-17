'use client'

import { GroupSwitcher } from '@/app/(dashboard)/dashboard/_components/group-switcher'
import * as React from 'react'
import { TransactionsContext, type GroupsPromise } from './guest-provider'

export function ClientGroupSwitcherShell({ userId }: { userId: string }) {
  const { transactions, groups, createGroup } = React.use(TransactionsContext)
  const [groupsPromise, setGroupsPromise] = React.useState<GroupsPromise>(null)

  React.useEffect(() => {
    function loadData() {
      const groupsPromise = Promise.resolve(groups)
      setGroupsPromise(groupsPromise)
    }
    loadData()
  }, [groups, transactions])

  return groupsPromise ? (
    <GroupSwitcher route="guest" userId={userId} groupsPromise={groupsPromise} createGroup={createGroup} />
  ) : null
}
