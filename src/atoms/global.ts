import { atomWithStorage } from 'jotai/utils'

export const currencyStateAtom = atomWithStorage<string>('currency', 'BRL')
