import * as React from 'react'

import { getRate } from '@/actions/server/currency-rates'
import { mockCategories, mockGroups, mockTransactions } from '@/lib/mocks'
import { Lobby } from './_components/lobby'
import { LobbySkeleton } from './_components/lobby-skeleton'

export default async function Page() {
  const groupsPromise = mockGroups
  const transactionsPromise = mockTransactions
  const categoriesPromise = mockCategories
  const ratesPromise = getRate('BRL')

  return (
    <React.Suspense fallback={<LobbySkeleton />}>
      <Lobby
        groupsPromise={groupsPromise}
        transactionsPromise={transactionsPromise}
        categoriesPromise={categoriesPromise}
        ratesPromise={ratesPromise}
      />
    </React.Suspense>
  )
}
