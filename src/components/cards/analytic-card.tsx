import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const AnalyticCard = ({
  title,
  wallet,
}: HTMLAttributes<HTMLDivElement> & {
  title: string
  wallet: {
    length: number
    value: number
  }
}) => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(wallet.value.toFixed(2)))

  return (
    <Card className={cn('', 'hover:bg-neutral-100 hover:dark:bg-neutral-900')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-medium md:text-lg lg:text-2xl">{formatted}</div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {wallet.length} Transactions
        </p>
      </CardContent>
    </Card>
  )
}
