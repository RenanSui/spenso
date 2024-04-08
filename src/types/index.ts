import { Icons } from '@/components/ui/icons'
import { Database } from './database.types'

export type TransactionTable = Database['next_auth']['Tables']['transactions']

export type Transaction = TransactionTable['Row']

export type TransactionInsert = TransactionTable['Insert']

export type TransactionUpdate = TransactionTable['Update']

export type TransactionCategories = { category: string; sum: number; currency: string }

export type TransactionTypes = 'income' | 'expense'

export type TransactionTypeses = { type: string; sum: number; currency: string }

export type TransactionYears = {
  year: string
  type: TransactionTypes
  sum: number
  currency: string
}

export type TransactionGroupsTable = Database['next_auth']['Tables']['transactions_groups']

export type TransactionGroups = TransactionGroupsTable['Row']

export type TransactionGroupsInsert = TransactionGroupsTable['Insert']

export type TransactionGroupsUpdate = TransactionGroupsTable['Update']

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface NavItem {
  id?: string
  title: string
  href?: string
  disabled?: boolean
  icon?: keyof typeof Icons
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren

export interface DashboardConfig {
  SidebarNav: SidebarNavItem[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type Rates = { [key: string]: number }

export type CurrencyRates = {
  timestamp: number
  date: string
  base: string
  rates: Rates
}

export type SessionUser = {
  address: string
} & {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}
