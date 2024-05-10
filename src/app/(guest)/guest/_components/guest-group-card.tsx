import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getGroupById } from '@/actions/server/transactions-groups'
import FormatGroupPill from '@/components/format-group-pill'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { CurrencyRates, Transaction } from '@/types'
import Link from 'next/link'
import * as React from 'react'

type Group = Awaited<ReturnType<typeof getGroupById>>

interface GuestGroupCardProps {
  group: Group
  href: string
  transactions: Transaction[] | null
}

export function GuestGroupCard({ group, transactions, href }: GuestGroupCardProps) {
  const [rates, setRates] = React.useState<(CurrencyRates | null)[]>()

  React.useEffect(() => {
    const initialLoad = async () => {
      const rates = (await getAllTransactionsRates(transactions)) ?? []
      setRates(rates)
    }
    initialLoad()
  }, [transactions])

  if (!transactions) return null
  const transactionsCount = transactions?.length

  return group ? (
    <Link href={href}>
      <Card className="relative h-full rounded-md transition-colors hover:bg-muted/25">
        <CardHeader>
          <CardTitle className="line-clamp-1">{group.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4 pt-4 text-[0.8rem] text-muted-foreground">
          <div className="flex items-center text-foreground">
            <Icons.cart className="mr-1.5 size-3.5" aria-hidden="true" />
            {transactionsCount} transactions
          </div>
          <div>{rates ? <FormatGroupPill rates={rates} transactions={transactions} /> : null}</div>
        </CardContent>
      </Card>
    </Link>
  ) : null
}
