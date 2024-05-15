import { DashboardConfig } from '@/types'

const dashboardConfig: DashboardConfig = {
  SidebarNav: [
    {
      title: 'Finances',
      href: '/guest/groups',
      disabled: false,
      icon: 'listBulletIcon',
      description: 'Manage your finances',
      items: [],
    },
    {
      title: 'Account',
      href: '/guest/account',
      disabled: true,
      icon: 'avatarIcon',
      description: 'Manage your account settings',
      items: [],
    },
    {
      title: 'Settings',
      href: '/guest/settings',
      disabled: false,
      icon: 'gearIcon',
      description: 'Manage the website settings',
      items: [],
    },
  ],
}

const guestDashboardConfig = dashboardConfig

export { guestDashboardConfig }
