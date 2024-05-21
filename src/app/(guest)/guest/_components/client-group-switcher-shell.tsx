'use client'

import { getGroups } from '@/actions/server/transactions-groups'
import { GroupSwitcher } from '@/app/(dashboard)/dashboard/_components/group-switcher'
import * as React from 'react'
import { TransactionsContext } from './guest-provider'

export function ClientGroupSwitcherShell({ userId }: { userId: string }) {
  const [groupsPromise, setGroupsPromise] = React.useState<ReturnType<
    typeof getGroups
  > | null>(null)
  const { groups, createGroup } = React.useContext(TransactionsContext)

  React.useEffect(() => {
    function initLoad() {
      const groupsPromise = Promise.resolve(groups)
      setGroupsPromise(groupsPromise)
    }
    initLoad()
  }, [groups])

  return groupsPromise ? (
    <GroupSwitcher
      route="guest"
      userId={userId}
      groupsPromise={groupsPromise}
      createGroup={createGroup}
    />
  ) : null
}
