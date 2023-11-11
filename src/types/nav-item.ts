export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren
