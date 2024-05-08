'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCurrencies } from '@/hooks/use-currencies'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useStore } from 'jotai'
import { useState } from 'react'
import { currencyAtom, useCurrencyAtom } from './providers/currency-provider'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

export const CurrencyToggle = () => {
  const mounted = useMounted()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const currency = useCurrencyAtom()
  const store = useStore()
  const { data: currencies, isFetching } = useCurrencies()

  return mounted ? (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit justify-between">
          {value ? currencies?.find((currency) => currency === value) : currency}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandEmpty>No currencies found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-32">
              {isFetching ? (
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton className="h-7 w-full rounded-sm" key={index} />
                  ))}
                </div>
              ) : (
                currencies?.map((currency) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue.toUpperCase())
                      store.set(currencyAtom, currentValue.toUpperCase())
                      setOpen(false)
                    }}
                  >
                    {currency}
                    <CheckIcon className={cn('ml-auto h-4 w-4', value === currency ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))
              )}
              <Separator />
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  ) : (
    <Skeleton className="h-9 px-11 py-2"></Skeleton>
  )
}
