import { Icons } from '@/components/ui/icons'

export type TransactionTypes = 'income' | 'expense'

export interface TransactionForm {
  product: string
  date: Date
  amount: number
  type: string
  category: string
}

export interface Transaction extends TransactionForm {
  id: string
  created_at: Date
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
