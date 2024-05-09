'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useMounted } from '@/hooks/use-mounted'
import { cn, removeArrayDuplicates } from '@/lib/utils'
import { CurrencyRates, Transaction, TransactionYears } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Skeleton } from '../ui/skeleton'
import { MonthsChart } from './months-chart'
import { YearsChart } from './years-chart'

interface LineChartShell extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: (CurrencyRates | null)[]
  transactions: Transaction[]
}

export const LineChartShell = ({ rates, years, className, transactions }: LineChartShell) => {
  const sortedYears = years.sort((item1, item2) => Number(item1.year) - Number(item2.year))
  const [year, setYear] = useState(sortedYears[sortedYears.length - 1]?.year ?? 'XXXX')
  const [chart, setChart] = useState<'Yearly' | 'Monthly'>('Yearly')
  const mounted = useMounted()

  return mounted ? (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center space-y-2 rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <div>
        <LineChartTabs chart={chart} setChart={setChart} setYear={setYear} year={year} years={years} />
      </div>

      {chart === 'Yearly' ? <YearsChart years={sortedYears} rates={rates} /> : null}
      {chart === 'Monthly' ? <MonthsChart transactions={transactions} year={year} rates={rates} /> : null}
    </div>
  ) : (
    <Skeleton className="h-[350px] lg:col-span-2" />
  )
}

interface LineChartTabsProps extends HTMLAttributes<HTMLDivElement> {
  setChart: Dispatch<SetStateAction<'Yearly' | 'Monthly'>>
  chart: 'Yearly' | 'Monthly'
  year: string
  setYear: Dispatch<SetStateAction<string>>
  years: TransactionYears[]
}

function LineChartTabs({ chart, setChart, setYear, year, years }: LineChartTabsProps) {
  const tabs = [{ chart: 'Yearly' }, { chart: 'Monthly' }]
  const mounted = useMounted()

  return mounted ? (
    <Tabs
      defaultValue={tabs.find((tab) => tab.chart === chart)?.chart ?? tabs[0].chart}
      className="sticky top-0 z-30 size-full overflow-auto px-1"
      onValueChange={(value) => setChart(value as 'Yearly' | 'Monthly')}
    >
      <ScrollArea orientation="horizontal" className="pb-2.5" scrollBarClassName="h-2">
        <TabsList className="inline-flex items-center justify-center space-x-1.5 text-muted-foreground">
          {tabs.map((tab) => (
            <div
              role="none"
              key={tab.chart}
              className={cn('border-b-2 border-transparent transition-all', tab.chart === chart && 'border-foreground')}
            >
              <TabsTrigger
                value={tab.chart}
                className={cn(
                  'inline-flex items-center justify-center rounded-sm  text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  tab.chart === chart && 'text-foreground',
                )}
                asChild
              >
                <Button variant="ghost" size="sm">
                  {tab.chart}
                </Button>
              </TabsTrigger>
            </div>
          ))}
          <YearToggle setYear={setYear} year={year} years={years} disabled={chart !== 'Monthly'} />
        </TabsList>
        <Separator />
      </ScrollArea>
    </Tabs>
  ) : (
    <div className="flex gap-2 pb-4 pt-1">
      <Skeleton className="h-8 rounded-sm px-8"></Skeleton>
      <Skeleton className="h-8 rounded-sm px-8"></Skeleton>
      <Skeleton className="h-8 rounded-sm px-8"></Skeleton>
    </div>
  )
}

interface YearToggleProps extends HTMLAttributes<HTMLDivElement> {
  year: string
  setYear: Dispatch<SetStateAction<string>>
  years: TransactionYears[]
  disabled?: boolean
}

function YearToggle({ setYear, year, years, disabled }: YearToggleProps) {
  const [open, setOpen] = useState(false)
  const allYears = removeArrayDuplicates(years.map((year) => year.year))

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <span
          className={cn(
            'inline-flex cursor-pointer items-center justify-center  rounded-sm text-sm font-medium text-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            disabled ? 'pointer-events-none opacity-30' : '',
          )}
        >
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
