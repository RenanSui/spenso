'use client'

import { GroupSwitcher } from '@/app/(dashboard)/dashboard/_components/group-switcher'
import * as React from 'react'
import { TransactionsContext } from './guest-provider'

export function ClientGroupSwitcherShell({ userId }: { userId: string }) {
  const { groupsPromise, createGroup } = React.use(TransactionsContext)

  return groupsPromise ? (
    <GroupSwitcher
      route="guest"
      userId={userId}
      groupsPromise={groupsPromise}
      createGroup={createGroup}
    />
  ) : null
}
