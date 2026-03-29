'use client';

// Node Modules
import { memo } from 'react';

// Components
import { Skeleton } from '@repo/ui/components/base/skeleton';

function LoadingAddressList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <div className="mb-6 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <div className="text-left">
                <Skeleton className="mb-2 h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-12 w-48 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="mb-1 h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-center space-x-3">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-3 w-16" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Skeleton className="mt-1 h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                <div className="flex space-x-2 border-t border-gray-100 pt-4">
                  <Skeleton className="h-8 flex-1 rounded" />
                  <Skeleton className="h-8 flex-1 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingAddressList);
