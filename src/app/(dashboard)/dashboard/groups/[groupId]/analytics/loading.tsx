import { PageHeader } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <Shell className="my-4">
      <PageHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-96" />
      </PageHeader>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {/* cards  */}
        <Skeleton className="h-[126px] w-full" />
        <Skeleton className="h-[126px] w-full" />
        <Skeleton className="h-[126px] w-full" />

        {/* line chart */}
        <Skeleton className="h-[350px] lg:col-span-2" />

        {/* analytic table */}
        <Skeleton className="h-full lg:row-span-2" />

        {/* pie chart */}
        <Skeleton className="h-[350px] lg:col-span-2" />

        {/* bar chart */}
        <Skeleton className="h-[350px] lg:col-span-3" />
      </div>
    </Shell>
  )
}
