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
      icon: 'avatarIcon',
      items: [],
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      disabled: false,
      icon: 'dashboardIcon',
      items: [],
    },
    {
      title: 'Transactions',
      href: '/dashboard/transactions',
      disabled: false,
      icon: 'listBulletIcon',
      items: [],
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      disabled: true,
      icon: 'gearIcon',
      items: [],
    },
  ],
}
