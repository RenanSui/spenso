import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function GroupLoading() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-8 w-48" />
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-xl gap-4">
            <div className="space-y-2.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 xs:flex-row">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}
