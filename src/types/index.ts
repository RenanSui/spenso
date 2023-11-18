import { Icons } from '@/components/ui/icons'

export type TransactionTypes = 'income' | 'expense'

export interface Transaction {
  id: string
  created_at: string
  merchant_name: string
  product: string
  date: string
  amount: string
  type: TransactionTypes
  category: string
  description?: string
  user_id: string
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
