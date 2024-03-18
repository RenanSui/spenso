'use client'

import { formatStateAtom } from '@/atoms/global'
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
// import { formats } from '@/config/dashboard'
import { useFormats } from '@/hooks/use-formats'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import * as React from 'react'
import { ScrollArea } from './ui/scroll-area'

export const FormatToggle = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [format, setFormat] = useAtom(formatStateAtom)
  const formats = useFormats()

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
            ? formats.find((format) => format.toLowerCase() === value)
            : format.toUpperCase()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandEmpty>No format found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-32">
              {formats.map((format) => (
                <CommandItem
                  key={format}
                  value={format}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setFormat(currentValue)
                    setOpen(false)
                  }}
                >
                  {format}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === format ? 'opacity-100' : 'opacity-0',
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
