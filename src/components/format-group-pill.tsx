'use client'

import { useMounted } from '@/hooks/use-mounted'
import { getCurrencyValue } from '@/lib/transactions'
import { cn, formatValue, toPositive } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { useMemo } from 'react'
import GroupPill from './group-pill'
import { useCurrencyAtom } from './providers/currency-provider'
import { Icons } from './ui/icons'
import { Skeleton } from './ui/skeleton'

interface FormatGroupPillProps {
  transactions: Transaction[] | null
  rates: (CurrencyRates | null)[]
}

export default function FormatGroupPill({ transactions, rates }: FormatGroupPillProps) {
  const mounted = useMounted()
  const currencyState = useCurrencyAtom()

  const calculated = useMemo(() => {
    const sums =
      transactions?.map((item) => {
        const { amount, currency } = item
        return getCurrencyValue(amount, currency, rates, currencyState)
      }) ?? []

    const revenue = {
      length: sums.filter((item) => item >= 0).length,
      value: sums.filter((item) => item >= 0).reduce((acc, curr) => acc + curr, 0),
    }
    const expenses = {
      length: sums.filter((item) => item < 0).length,
      value: sums.filter((item) => item < 0).reduce((acc, curr) => acc + curr, 0),
    }

    const totals = {
      length: revenue.length + expenses.length,
      value: revenue.value + expenses.value,
    }

    return { totals, revenue, expenses }
  }, [currencyState, rates, transactions])

  const isRevenueGreater = calculated.revenue.value > toPositive(calculated.expenses.value)

  return mounted ? (
    <GroupPill
      className={cn(
        'flex items-center text-xs',
        isRevenueGreater ? 'text-foreground' : 'text-red-600 dark:text-red-400',
      )}
    >
      <Icons.activity className="mr-1.5 size-3.5" aria-hidden="true" />
      {isRevenueGreater
        ? `${formatValue(calculated.revenue.value, currencyState)} revenue`
        : `${formatValue(calculated.expenses.value, currencyState)} expenses`}
    </GroupPill>
  ) : (
    <Skeleton className="h-4 w-36 rounded-sm"></Skeleton>
  )
}
