'use client'

import { deleteGroup } from '@/actions/server/transactions-groups'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Icons } from '@/components/ui/icons'
import { useMediaQuery } from '@/hooks/use-media-query'
import * as React from 'react'

interface DeleteGroupDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  groupId: string
}

export function DeleteGroupDialog({ groupId }: DeleteGroupDialogProps) {
  const [loading, setLoading] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  if (!groupId) return null

  const onDelete = async () => {
    setLoading(true)
    await deleteGroup(groupId)
    setLoading(false)
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DrawerTrigger asChild>
          <Button variant="destructive">Delete group</Button>
        </DrawerTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete group</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your group.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={onDelete} disabled={loading} variant="destructive">
              {loading && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              Delete group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive">Delete group</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete group</DrawerTitle>
          <DrawerDescription>This action cannot be undone. This will permanently delete your group.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex-col-reverse px-0">
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          <Button type="button" onClick={onDelete} disabled={loading} variant="destructive">
            {loading && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            Delete group
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
