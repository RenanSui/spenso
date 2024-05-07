import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getGroupById } from '@/actions/server/transactions-groups'
import { Transaction } from '@/types'
import Link from 'next/link'
import FormatGroupPill from './format-group-pill'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Icons } from './ui/icons'

type Group = Awaited<ReturnType<typeof getGroupById>>

interface GroupCardProps {
  group: Group
  href: string
  transactions: Transaction[] | null
}

export async function GroupCard({ group, transactions, href }: GroupCardProps) {
  if (!transactions) return null
  const transactionsCount = transactions?.length

  const rates = await getAllTransactionsRates(transactions)
  if (!rates) return null

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
          <div>
            <FormatGroupPill rates={rates} transactions={transactions} />
          </div>
        </CardContent>
      </Card>
    </Link>
  ) : null
}
