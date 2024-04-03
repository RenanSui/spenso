import { getRate } from '@/actions/server/currency-rates'
import { useQuery } from '@tanstack/react-query'

export const useCurrencies = () => {
  return useQuery({
    queryKey: ['transactions-currencies'],
    queryFn: async () => {
      const data = await getRate('BRL')
      const currencyRates = Object.keys(data.rates)
      return currencyRates
    },
    gcTime: 0,
    staleTime: 0,
    initialData: [],
    refetchOnWindowFocus: false,
  })
}
