'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (paramsToUpdate: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(paramsToUpdate).forEach((key) => {
        const value = paramsToUpdate[key];
        if (value !== null && value !== undefined) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const queryString = params.toString();
      router.push(`${pathname}?${queryString}`, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  return updateQueryString;
}

export function useGetParams() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  const getParam = useCallback(
    (name: string) => {
      return params[name] || null;
    },
    [params],
  );

  const getAllParams = useCallback(() => {
    return { ...params };
  }, [params]);

  return {
    getParam,
    getAllParams,
  };
}
