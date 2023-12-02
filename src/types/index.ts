import { Icons } from '@/components/ui/icons'
import { Database } from '@/lib/database.types'

export type TransactionTable = Database['next_auth']['Tables']['transactions']

export type Transaction = TransactionTable['Row']

export type TransactionInsert = TransactionTable['Insert']

export type TransactionUpdate = TransactionTable['Update']

export type TransactionCategories = { category: string; sum: number }

export type TransactionTypes = 'income' | 'expense'

export type TransactionTypeses = { type: string; sum: number }

export type TransactionYears = {
  year: string
  type: TransactionTypes
  sum: number
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface NavItem {
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

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren
