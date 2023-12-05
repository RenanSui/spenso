'use client'

import { formatStateAtom } from '@/atoms/global'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formats } from '@/config/dashboard'
import { useAtom } from 'jotai'

export const FormatToggle = () => {
  const [format, useFormat] = useAtom(formatStateAtom)

  return (
    <Select onValueChange={useFormat} defaultValue={format || formats[0]}>
      <FormControl className="w-fit">
        <SelectTrigger>
          <SelectValue placeholder="Select a transaction type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {formats.map((type) => {
          return (
            <SelectItem className="capitalize" key={type} value={type}>
              {type}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
