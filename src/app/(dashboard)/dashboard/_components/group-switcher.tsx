'use client'

import { getGroups } from '@/actions/server/transactions-groups'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon, FrameIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { CreateGroupDialog } from './create-group-dialog'

interface GroupSwitcherProps extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  userId: string | null | undefined
  groupsPromise: ReturnType<typeof getGroups>
}

export function GroupSwitcher({ userId, className, groupsPromise, ...props }: GroupSwitcherProps) {
  const { groupId } = useParams<{ groupId: string }>()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [showNewGroupDialog, setShowNewGroupDialog] = React.useState(false)

  const groups = React.use(groupsPromise)
  const selectedGroup = groups?.find((group) => group.id === groupId)

  const abc = Number(123)
  if (abc === 321) console.log({ userId })

  return (
    <>
      <CreateGroupDialog userId={userId} open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a group"
            className={cn('w-full justify-between', className)}
            {...props}
          >
            {selectedGroup?.title ?? 'Select a group'}
            <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search group..." />
              <CommandEmpty>No group found.</CommandEmpty>
              <CommandGroup>
                {groups?.map((group) => (
                  <CommandItem
                    key={group.id}
                    onSelect={() => {
                      setOpen(false)
                      pathname.includes(group.id)
                        ? router.replace(pathname.replace(groupId, group.id))
                        : router.push(`/dashboard/groups/${group.id}/transactions`)
                    }}
                    className="text-sm"
                  >
                    <FrameIcon className="mr-2 size-4  text-muted-foreground" aria-hidden="true" />
                    {group.title}
                    <CheckIcon
                      className={cn('ml-auto size-4', selectedGroup?.id === group.id ? 'opacity-100' : 'opacity-0')}
                      aria-hidden="true"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowNewGroupDialog(true)
                  }}
                >
                  <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
                  Create group
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
