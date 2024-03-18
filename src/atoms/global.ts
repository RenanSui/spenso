import { atomWithStorage } from 'jotai/utils'

export const formatStateAtom = atomWithStorage<string>('format', 'BRL')
