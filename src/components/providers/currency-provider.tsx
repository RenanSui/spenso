'use client'

import { Provider, createStore, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const store = createStore()
export const currencyAtom = atomWithStorage('currency', 'BRL')

export const CurrencyProvider = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Provider store={store}>{children}</Provider>
)

export const useCurrencyAtom = () => {
  return useAtomValue(currencyAtom)
}
