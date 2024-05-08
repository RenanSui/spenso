import Link from 'next/link'

import { ContentSection } from '@/components/content-section'
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import TransactionTableSkeleton from './transaction-table-skeleton'
import { GroupCardSkeleton } from '@/components/group-card-skeleton'

export function LobbySkeleton() {
  return (
    <Shell className="max-w-6xl gap-0">
      <PageHeader as="section" className="mx-auto items-center gap-2 text-center" withPadding>
        <PageHeaderHeading className="animate-fade-up" style={{ animationDelay: '0.20s', animationFillMode: 'both' }}>
          Simple way to manage personal finances
        </PageHeaderHeading>
        <PageHeaderDescription
          className="max-w-[46.875rem] animate-fade-up"
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
        >
          Take charge of your finances with Spenso. Our free budget tracker helps you understand your spending for a
          brighter financial future. Find Happiness In Budgeting!
        </PageHeaderDescription>
        <PageActions className="animate-fade-up" style={{ animationDelay: '0.40s', animationFillMode: 'both' }}>
          <Link className={buttonVariants()} href="/dashboard/groups">
            Try now
          </Link>
          <Link className={buttonVariants({ variant: 'outline' })} href="/signin">
            Sign in
          </Link>
        </PageActions>
      </PageHeader>
      <ContentSection
        title="Simple money tracker"
        description="It takes seconds to record daily transactions."
        href="/dashboard/groups"
        linkText="View your groups"
        className="pt-14 md:pt-20 lg:pt-24"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <GroupCardSkeleton key={`empty-card-${index}`} />
        ))}
      </ContentSection>
      <ContentSection
        title="Track your cash flow"
        description="It takes seconds to record daily transactions."
        href="/dashboard/groups"
        linkText="Add your transactions"
        className="pt-14 md:pt-20 lg:pt-24"
        asChild
      >
        <div className="grid grid-cols-1">
          <TransactionTableSkeleton />
        </div>
      </ContentSection>
      <ContentSection
        title="Understand your financial habits"
        description="One report to give a clear view on your spending patterns."
        href="/dashboard/all-groups/analytics"
        linkText="Analyze your finances"
        className="py-14 md:py-20 lg:py-24"
        asChild
      >
        <div className="grid grid-cols-1">
          <Skeleton className="h-[350px] lg:col-span-3" />
        </div>
      </ContentSection>
    </Shell>
  )
}
