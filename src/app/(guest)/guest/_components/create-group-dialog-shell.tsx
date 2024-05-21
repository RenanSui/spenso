'use client'

import { CreateGroupDialog } from '@/app/(dashboard)/dashboard/_components/create-group-dialog'
import * as React from 'react'
import { TransactionsContext } from './guest-provider'

type CreateGroupDialogShellProps = {
  userId: string | null | undefined
}

export function CreateGroupDialogShell({
  userId,
}: CreateGroupDialogShellProps) {
  const guest = React.useContext(TransactionsContext)

  return (
    <CreateGroupDialog
      userId={userId}
      route="guest"
      createGroup={guest.createGroup}
    />
  )
}
