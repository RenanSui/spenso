import { getGroups } from '@/actions/server/transactions-groups'
import { useQuery } from '@tanstack/react-query'

export function useGroups() {
  return useQuery({
    queryKey: ['transactions-groups'],
    queryFn: async () => {
      const transactionsGroups = await getGroups()
      if (!transactionsGroups) return null
      return transactionsGroups
    },
    gcTime: 0,
    staleTime: 0,
    initialData: [],
    refetchOnWindowFocus: false,
  })
}
