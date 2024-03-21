'use client'

import { getTransactionCurrencies } from '@/actions/server/transactions'
import { currencyStateAtom } from '@/atoms/global'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

export const CurrencyToggle = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [currency, setCurrency] = useAtom(currencyStateAtom)
  const [currencies, setCurrencies] = useState<string[]>([])

  useEffect(() => {
    const getCurrencies = async () => {
      const transactionCurrencies = await getTransactionCurrencies()
      setCurrencies(transactionCurrencies)
    }
    getCurrencies()
  }, [currency])

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value
            ? currencies.find((currency) => currency.toLowerCase() === value)
            : currency.toUpperCase()}
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
                    setValue(currentValue === value ? '' : currentValue)
                    setCurrency(currentValue.toUpperCase())
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
