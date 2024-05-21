'use client'

import { useMounted } from '@/hooks/use-mounted'
import { cn, formatValue } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { useCurrencyAtom } from '../providers/currency-provider'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const AnalyticCard = ({
  wallet,
  total,
  children,
}: HTMLAttributes<HTMLDivElement> & {
  total: number
  wallet: {
    length: number
    value: number
  }
}) => {
  const mounted = useMounted()
  const currency = useCurrencyAtom()
  const formatted = formatValue(wallet.value, currency)
  const percent = parseInt(((wallet.length * 100) / total).toFixed(0))
  const percentFormatted = isNaN(percent) ? 100 : percent

  return mounted ? (
    <Card className={cn('', 'hover:bg-neutral-100 hover:dark:bg-neutral-900')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {children}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'font-normal md:text-lg lg:text-2xl',
            wallet.value < 0 ? 'text-red-400' : '',
          )}
        >
          {formatted}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {`${percentFormatted}%`} of Transactions
        </p>
      </CardContent>
    </Card>
  ) : (
    <Skeleton className="h-[126px] w-full" />
  )
}
