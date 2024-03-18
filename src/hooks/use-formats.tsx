import { useEffect, useState } from 'react'

type Rates = { [key: string]: number }

type CurrencyRates = {
  date: string
  base: string
  rates: Rates
}

export const useFormats = () => {
  const [formats, setFormats] = useState<string[]>([])

  useEffect(() => {
    const getRates = async () => {
      const res = await fetch('/api/currencies')
      const data = (await res.json()) as CurrencyRates
      const currencyRates = Object.keys(data.rates)
      setFormats(currencyRates)
    }
    getRates()
  }, [])

  return formats
}
