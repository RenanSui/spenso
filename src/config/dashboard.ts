import { DashboardConfig, TransactionTypes } from '@/types'

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

export const transactionType = ['expense', 'income']

export const transactionCategory = [
  'housing',
  'hobbies',
  'transportation',
  'utilities',
  'insurance',
  'saving & debts',
  'personal spending',
  'entertainment',
  'food',
  'miscellaneous',
  'interest',
  'benefits',
  'taxes',
  'travel',
  'other',
].sort()

export const transactionTypeses: {
  label: string
  value: TransactionTypes
}[] = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
]
