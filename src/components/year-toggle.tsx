'use client'

import { removeArrayDuplicates } from '@/lib/utils'
import { TransactionYears } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface YearToggleProps extends HTMLAttributes<HTMLDivElement> {
  year: string
  setYear: Dispatch<SetStateAction<string>>
  years: TransactionYears[]
}

export const YearToggle = ({ setYear, year, years }: YearToggleProps) => {
  const [open, setOpen] = useState(false)
  const allYears = removeArrayDuplicates(years.map((year) => year.year))

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <span className="flex h-5 cursor-pointer items-center rounded-md border px-1 dark:border-neutral-800">
          {/* {year} */}
          {year}
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search year..." className="h-9" />
          <CommandEmpty>No years found.</CommandEmpty>
          <CommandGroup>
            {allYears.map((year) => {
              return (
                <CommandItem
                  key={year}
                  value={year}
                  onSelect={(currentValue) => {
                    setYear(currentValue)
                    setOpen(false)
                  }}
                >
                  {year}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
