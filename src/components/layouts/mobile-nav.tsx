'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import type { NavItemWithChildren, NavItemWithOptionalChildren, SidebarNavItem } from '@/types'
import { DashboardIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import * as React from 'react'

interface MobileNavProps {
  sidebarNavItems: SidebarNavItem[]
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  segment: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

export function MobileNav({ sidebarNavItems }: MobileNavProps) {
  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState(false)

  const navItems = React.useMemo(() => {
    const items: NavItemWithOptionalChildren[] = []
    const myAccountItem = {
      title: 'My Account',
      items: sidebarNavItems,
    }

    const myAccountIndex = items.findIndex((item) => item.title === 'My Account')
    if (myAccountIndex !== -1) {
      items.splice(myAccountIndex, 1)
    }

    items.splice(1, 0, myAccountItem)

    return items
  }, [sidebarNavItems])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild aria-label="mobile-nav-trigger">
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <DashboardIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="font-bold">{siteConfig.name}</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="multiple" defaultValue={navItems.map((item) => item.title)} className="w-full">
              {navItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, subIndex) => {
                        return subItem.items.length > 0 ? (
                          <NestedAccordionNavItems key={subIndex} item={subItem} setIsOpen={setIsOpen} />
                        ) : subItem.href ? (
                          <MobileLink
                            key={subIndex}
                            href={String(subItem.href)}
                            segment={String(segment)}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div key={subIndex} className="text-neutral-400/70 transition-colors">
                            {item.title}
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface NestedAccordionNavItemsProps {
  item: NavItemWithChildren
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NestedAccordionNavItems = ({ item, setIsOpen, ...props }: NestedAccordionNavItemsProps) => {
  const segment = useSelectedLayoutSegment()

  return (
    <Accordion type="multiple" defaultValue={[item.title]} className="w-full" {...props}>
      <AccordionItem value={item.title}>
        <AccordionTrigger className="py-0 text-sm capitalize">{item.title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-2 pt-2">
            {item.items?.map((subItem, index) =>
              subItem.href ? (
                <MobileLink
                  className="pl-4"
                  key={index}
                  href={String(subItem.href)}
                  segment={String(segment)}
                  setIsOpen={setIsOpen}
                  disabled={subItem.disabled}
                >
                  {subItem.title}
                </MobileLink>
              ) : (
                <div key={index} className="text-neutral-400/70 transition-colors">
                  {item.title}
                </div>
              ),
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function MobileLink({ children, href, disabled, segment, setIsOpen, className }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-neutral-900 transition-colors hover:text-neutral-400 dark:text-neutral-100 hover:dark:text-neutral-300',
        href.includes(segment) && 'text-neutral-900 dark:text-neutral-100',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
