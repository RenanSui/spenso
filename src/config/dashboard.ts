import type { SidebarNavItem } from '@/types/nav-item'

export interface DashboardConfig {
  SidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  SidebarNav: [
    {
      title: 'Account',
      href: '/dashboard/account',
      disabled: true,
      items: [],
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      disabled: false,
      items: [],
    },
    {
      title: 'Transactions',
      href: '/dashboard/transactions',
      disabled: false,
      items: [],
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      disabled: true,
      items: [],
    },
  ],
}
