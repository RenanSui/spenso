'use client'

import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
  return useQuery({
    queryKey: ['dummy-products'],
    queryFn: async () => {
      const apiURL = 'https://dummyjson.com/products'
      const res = await fetch(apiURL, { next: { revalidate: false } })
      const data = (await res.json()) as { products: [{ title: string }] }
      const products = data.products.map((item) => item.title).sort()
      return products
    },
    initialData: [],
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
