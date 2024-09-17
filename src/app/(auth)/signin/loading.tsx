import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <section className="flex bg-white text-black dark:bg-black dark:text-white">
      <div className=" absolute inset-0 w-screen md:relative">
        {/* image */}
        <Skeleton className="absolute inset-0 size-full bg-neutral-100 object-cover text-transparent opacity-100 dark:bg-neutral-900" />
      </div>

      <div className="relative z-10 flex h-screen w-screen items-center justify-center p-8">
        <div className="w-full max-w-screen-xs rounded-xl border p-6 shadow dark:border-neutral-900 dark:bg-black xl:mx-8">
          <div className="flex flex-col space-y-1 pb-6">
            <Skeleton className="w-24 rounded bg-neutral-400 py-3"></Skeleton>
            <Skeleton className="w-full rounded bg-neutral-400 py-2"></Skeleton>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
            <Skeleton className="h-9 rounded bg-neutral-400 px-4 py-2" />
            <Skeleton className="h-9 rounded bg-neutral-400 px-4 py-2" />
            <Skeleton className="h-9 rounded bg-neutral-400 px-4 py-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
