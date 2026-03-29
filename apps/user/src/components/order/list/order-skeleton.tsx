import { Skeleton } from '@repo/ui/components/base/skeleton';

export default function OrderListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-12 w-12 rounded-md" />
                ))}
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
