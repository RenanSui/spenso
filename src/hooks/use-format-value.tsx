import { formatStateAtom } from '@/atoms/global'
import { useAtom } from 'jotai'

export const useFormatValue = (value: number) => {
  const [format] = useAtom(formatStateAtom)

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: format,
  }).format(parseFloat(value.toFixed(2)))
}
