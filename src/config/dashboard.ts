import { type DashboardConfig, type TransactionTypes } from '@/types'

export const dashboardConfig: DashboardConfig = {
  SidebarNav: [
    {
      title: 'Finances',
      href: '/dashboard/groups',
      disabled: false,
      icon: 'listBulletIcon',
      description: 'Manage your finances',
      items: [],
    },
    {
      title: 'Account',
      href: '/dashboard/account',
      disabled: true,
      icon: 'avatarIcon',
      description: 'Manage your account settings',
      items: [],
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      disabled: false,
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
