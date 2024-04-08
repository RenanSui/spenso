import { NavItemWithChildren, TransactionGroups } from '@/types'

export const addGroupsToNavbarNav = async (
  SidebarNav: NavItemWithChildren[],
  transactionsGroups: TransactionGroups[],
) => {
  return await Promise.all(
    SidebarNav.map(async (item) => {
      if (item.title === 'Transactions') {
        return {
          ...item,
          items: transactionsGroups
            .map((item) => ({
              id: item.id,
              title: item.title,
              href: `/dashboard/transactions/${item.id}?title=${item.title}`,
              items: [],
            }))
            .sort((item1, item2) => {
              return item1.title.localeCompare(item2.title)
            }),
        }
      }
      return item
    }),
  )
}
