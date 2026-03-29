'use client';

import { Skeleton } from '@repo/ui/components/base/skeleton';

export default function LoadingWishlist() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <Skeleton className="h-12 w-72" />
          </div>
          <Skeleton className="mx-auto mb-6 h-6 w-96" />
          <Skeleton className="mx-auto h-8 w-32 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
            >
              <Skeleton className="h-48 w-full" />

              <div className="space-y-3 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
