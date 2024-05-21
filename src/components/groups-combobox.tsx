'use client'

import {
  getGroups,
  getGroupBySearch,
} from '@/actions/server/transactions-groups'
import { useDebounce } from '@/hooks/use-debounce'
import { cn, isMacOs, normalizeString } from '@/lib/utils'
import { TransactionGroups } from '@/types'
import { GroupIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Kbd } from './kbd'
import { Button } from './ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Skeleton } from './ui/skeleton'

export default function GroupsCombobox() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<TransactionGroups[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function initFetchData() {
      setLoading(true)
      const result = await getGroups()
      if (!result) {
        setLoading(false)
        return
      }
      setData(result)
      setLoading(false)
    }

    if (data?.length === 0) initFetchData()
    if (!data) initFetchData()
  }, [data])

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null)
      return
    }

    async function fetchData() {
      setLoading(true)
      const result = await getGroupBySearch(debouncedQuery)
      if (!result) {
        setLoading(false)
        return
      }
      setData(result)
      setLoading(false)
    }

    fetchData()
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const onSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search groups...</span>
        <span className="sr-only">Search groups</span>
        <Kbd
          title={isMacOs() ? 'Command' : 'Control'}
          className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:block"
        >
          {isMacOs() ? '⌘' : 'Ctrl'} K
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            setQuery('')
          }
        }}
      >
        <CommandInput
          placeholder="Search groups..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(loading ? 'hidden' : 'py-6 text-center text-sm')}
          >
            No groups found.
          </CommandEmpty>
          {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data && (
              <CommandGroup className="capitalize" heading="Groups">
                {data?.map((group) => (
                  <CommandItem
                    key={group.id}
                    className="h-9"
                    value={normalizeString(group.title)}
                    onSelect={() =>
                      onSelect(() =>
                        router.push(
                          `/dashboard/groups/${group.id}?title=${group.title}`,
                        ),
                      )
                    }
                  >
                    <GroupIcon
                      className="mr-2.5 size-3 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="truncate">{group.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
