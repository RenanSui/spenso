import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />

      <div className="w-full space-y-3 overflow-auto">
        {/* data table toolbar */}
        <div className="flex flex-1 items-center justify-between gap-2 space-x-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-[150px] lg:w-[250px]" />
            <Skeleton className="mr-auto h-[28px] w-[75px]" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="ml-auto h-[30px] w-[75px]" />
            <Skeleton className="ml-auto h-[30px] w-[75px]" />
            <Skeleton className="hidden h-[28px] w-[75px] lg:block" />
          </div>
        </div>

        {/* table */}
        <Skeleton className="h-[680px] w-full" />

        {/* data table pagination */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[160px]" />

          <div className="flex items-center gap-12">
            <Skeleton className="h-8 w-[180px]" />
            <Skeleton className="h-8 w-[80px]" />
            <div className="flex gap-2">
              <Skeleton className="h-[30px] w-[30px]" />
              <Skeleton className="h-[30px] w-[30px]" />
              <Skeleton className="h-[30px] w-[30px]" />
              <Skeleton className="h-[30px] w-[30px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
