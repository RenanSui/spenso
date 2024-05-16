import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />

      <DataTableSkeleton
        columnCount={6}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={['10rem', '40rem', '12rem', '12rem', '12rem', '12rem']}
        shrinkZero
      />
    </div>
  )
}
