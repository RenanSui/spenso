import { getRate } from '@/actions/server/currency-rates'
import { Groups } from '@/app/(dashboard)/dashboard/_components/groups'
import { CategoriesChart } from '@/components/charts/categories-chart'
import { ContentSection } from '@/components/content-section'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { buttonVariants } from '@/components/ui/button'
import { getUser } from '@/lib/auth'
import { mockCategories, mockGroups, mockTransactions } from '@/lib/mocks'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LobbyTransactionsTable } from './lobby-transactions-table'

interface LobbyProps {
  groupsPromise: typeof mockGroups
  transactionsPromise: typeof mockTransactions
  categoriesPromise: typeof mockCategories
  ratesPromise: ReturnType<typeof getRate>
  userPromise: ReturnType<typeof getUser>
}

export async function Lobby({
  ratesPromise,
  categoriesPromise,
  groupsPromise,
  transactionsPromise,
  userPromise,
}: LobbyProps) {
  const transactions = await transactionsPromise
  const categories = await categoriesPromise
  const rates = await ratesPromise
  const user = await userPromise

  return (
    <Shell className="max-w-6xl gap-0">
      <PageHeader
        as="section"
        className="relative mx-auto items-center gap-2 text-center"
        withPadding
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,hsla(0,0%,10%,1)0%,hsla(240,10%,4%,1)50%)]" />
        <PageHeaderHeading
          className="animate-fade-up"
          style={{ animationDelay: '0.20s', animationFillMode: 'both' }}
        >
          Simple way to manage personal finances
        </PageHeaderHeading>
        <PageHeaderDescription
          className="max-w-[46.875rem] animate-fade-up"
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
        >
          Take charge of your finances with Spenso. Our free budget tracker
          helps you understand your spending for a brighter financial future.
          Find Happiness In Budgeting!
        </PageHeaderDescription>
        <PageActions className="grid space-x-0 space-y-4">
          {!user ? (
            <>
              <div
                className="animate-fade-up"
                style={{ animationDelay: '0.40s', animationFillMode: 'both' }}
              >
                <Link
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full px-16',
                  )}
                  href="/signin"
                >
                  Sign in
                </Link>
              </div>

              <div
                className="relative animate-fade-up"
                style={{ animationDelay: '0.50s', animationFillMode: 'both' }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Link
                className={cn(buttonVariants(), 'animate-fade-up')}
                style={{ animationDelay: '0.60s', animationFillMode: 'both' }}
                href="/guest/groups"
              >
                Continue as guest
              </Link>
            </>
          ) : (
            <div
              className="animate-fade-up space-x-4"
              style={{ animationDelay: '0.40s', animationFillMode: 'both' }}
            >
              <Link className={cn(buttonVariants())} href="/dashboard/groups">
                Dashboard
              </Link>
              <Link
                className={cn(buttonVariants({ variant: 'outline' }))}
                href="/dashboard/settings"
              >
                Settings
              </Link>
            </div>
          )}
        </PageActions>
      </PageHeader>
      <ContentSection
        title="Simple money tracker"
        description="It takes seconds to record daily transactions."
        href="/dashboard/groups"
        linkText="View your groups"
        className="pt-14 md:pt-20 lg:pt-24"
      >
        <Groups
          href="/dashboard/groups"
          groupsPromise={groupsPromise}
          transactionsPromise={transactionsPromise}
        />
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
          <LobbyTransactionsTable
            groupId="abc123"
            data={transactions}
            rates={[rates]}
            mocked
          />
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
          <CategoriesChart
            className="h-[350px]"
            categories={categories}
            rates={[rates]}
          />
        </div>
      </ContentSection>
    </Shell>
  )
}
