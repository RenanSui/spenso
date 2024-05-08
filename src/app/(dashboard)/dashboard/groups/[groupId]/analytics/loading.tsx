import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <div className="space-y-4">
      <PageHeader>
        <Skeleton className="h-8 w-48" />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
    </div>
  )
}
