'use client'

import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types'
import { CaretRightIcon, ChevronLeftIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import { TransactionsGroupForm } from '../transactions-groups/transactions-group-form'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { buttonVariants } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Icons } from '../ui/icons'
import { Separator } from '../ui/separator'

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const [open, setOpen] = useState(false)
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  const title = searchParams.get('title') ?? ''

  if (!items?.length) return null

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon

        return item.href ? (
          item.items.length > 0 ? (
            <Accordion
              type="multiple"
              defaultValue={[segment === 'transactions' ? item.title : '']}
              className="w-full"
              key={index}
            >
              <AccordionItem
                value={item.title}
                className={cn('group', item.disabled && 'pointer-events-none opacity-60')}
              >
                <AccordionTrigger
                  className={cn(
                    'rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    item.href.includes(String(segment))
                      ? 'bg-neutral-100 font-medium text-black dark:bg-neutral-800 dark:text-neutral-50'
                      : '',
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span className="mr-auto text-base font-normal">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pt-2 ">
                    <ul className="flex flex-col space-y-2 py-2">
                      {item.items?.map((subItem, subIndex) => {
                        return (
                          <li
                            className={cn(
                              'px-8',
                              subItem.title === title ? 'rounded bg-neutral-100 dark:bg-neutral-900' : '',
                            )}
                            key={`sub-${subIndex}`}
                          >
                            <Link
                              href={subItem.href ?? '/'}
                              className="flex items-center gap-2 text-sm hover:underline"
                            >
                              {subItem.title === title ? <CaretRightIcon /> : ''}
                              {subItem.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'px-6')}>
                        <PlusCircledIcon className="h-4 w-4" />
                      </DialogTrigger>
                      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle>Add Group</DialogTitle>
                        </DialogHeader>
                        <Separator />
                        <TransactionsGroupForm formAction="add" setOpen={setOpen} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              className={cn('', item.disabled && 'pointer-events-none opacity-60')}
              aria-label={item.title}
              key={index}
              href={item.href}
            >
              <span
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-neutral-950 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800',
                  item.href.includes(String(segment))
                    ? 'bg-neutral-100 font-medium text-black dark:bg-neutral-800 dark:text-neutral-50'
                    : '',
                  item.disabled && 'pointer-events-none opacity-60',
                )}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        ) : (
          <span
            key={index}
            className="text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
