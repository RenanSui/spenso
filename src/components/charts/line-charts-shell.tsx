'use client'

import { cn } from '@/lib/utils'
import { CurrencyRates, Transaction, TransactionYears } from '@/types'
import { HTMLAttributes, useState } from 'react'
import { Switch } from '../ui/switch'
import { YearToggle } from '../year-toggle'
import { MonthsChart } from './months-chart'
import { YearsChart } from './years-chart'

interface LineChartShell extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: (CurrencyRates | null)[]
  transactions: Transaction[]
}

export const LineChartShell = ({ rates, years, className, transactions }: LineChartShell) => {
  const [isChecked, setChecked] = useState(true)
  const [year, setYear] = useState(years[years.length - 1]?.year ?? 'XXXX') // ?.year ?? 'XXXX'

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center rounded-xl border p-2 pt-6 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center">
        <Switch id="chart-mode" checked={isChecked} onCheckedChange={setChecked} />
        <span className="relative text-sm text-neutral-700 dark:text-neutral-400">
          <span className="opacity-0">XXXXXXX XXXX XX</span>
          <span className="absolute left-2">
            {isChecked ? (
              'Yearly'
            ) : (
              <div className="flex gap-1">
                <span>Monthly</span>
                <YearToggle years={years} year={year} setYear={setYear} />
              </div>
            )}
          </span>
        </span>
      </div>

      {!isChecked ? <MonthsChart transactions={transactions} rates={rates} year={year} /> : null}
      {isChecked ? <YearsChart years={years} rates={rates} /> : null}
    </div>
  )
}
