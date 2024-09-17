import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="flex bg-white text-black dark:bg-black dark:text-white">
      <div className=" absolute inset-0 w-screen md:relative">
        {/* image */}
        <Skeleton className="absolute inset-0 size-full bg-neutral-100 object-cover text-transparent dark:bg-neutral-900" />
      </div>

      <div className="relative z-10 flex h-screen w-screen items-center justify-center p-8">
        <div className="w-full max-w-xs rounded-xl bg-transparent p-6 shadow xl:mx-8">
          <div className="flex flex-col items-center space-y-1 pb-6">
            <Skeleton className="w-24 rounded bg-neutral-400 py-3"></Skeleton>
            <Skeleton className="w-48 rounded bg-neutral-400 py-2"></Skeleton>
            <Skeleton className="w-48 rounded bg-neutral-400 py-2"></Skeleton>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-7 rounded-md bg-neutral-400 px-2" />
            <Skeleton className="h-7 rounded-md bg-neutral-400 px-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
