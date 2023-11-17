import { Icons } from '@/components/ui/icons'

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
