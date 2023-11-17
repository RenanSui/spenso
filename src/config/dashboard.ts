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
      description: 'Manage your account settings',
      items: [],
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      disabled: false,
      icon: 'dashboardIcon',
      description: 'Analyze your transactions',
      items: [],
    },
    {
      title: 'Transactions',
      href: '/dashboard/transactions',
      disabled: false,
      icon: 'listBulletIcon',
      description: 'Manage your transactions',
      items: [],
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      disabled: true,
      icon: 'gearIcon',
      description: 'Manage the website settings',
      items: [],
    },
  ],
}
