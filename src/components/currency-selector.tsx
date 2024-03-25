'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useCurrencies } from '@/hooks/use-currencies'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { ScrollArea } from './ui/scroll-area'

type CurrencySelectorProps = {
  value: string
  onChange: (currency: string) => void
}

export const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const [open, setOpen] = React.useState(false)
  const { data: currencies } = useCurrencies()

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value.toUpperCase()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandEmpty>No currencies found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-32">
              {currencies.map((currency) => (
                <CommandItem
                  key={currency}
                  value={currency}
                  onSelect={(currentValue) => {
                    onChange(currentValue.toUpperCase())
                    setOpen(false)
                  }}
                >
                  {currency}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === currency ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
