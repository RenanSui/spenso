import { getRate } from '@/lib/transactions'
import { useEffect, useState } from 'react'

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<string[]>([])

  useEffect(() => {
    const getRates = async () => {
      const data = await getRate('BRL')
      const currencyRates = Object.keys(data.rates)
      setCurrencies(currencyRates)
    }
    getRates()
  }, [])

  return currencies
}
