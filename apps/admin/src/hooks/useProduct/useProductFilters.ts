import debounce from 'lodash.debounce';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';
import { useCallback, useEffect, useRef } from 'react';

import { Visibility } from '@repo/types/product';

export function useProductFilters(debounceDelay = 400) {
  const [search, setSearch] = useQueryState('search', parseAsString);
  const [category, setCategory] = useQueryState('category', parseAsString);
  const [visibility, setVisibility] = useQueryState(
    'visibility',
    parseAsStringEnum<Visibility>(Object.values(Visibility)).withDefault(
      Visibility.BOTH,
    ),
  );

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      setSearch(search);
    }, debounceDelay),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;

    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleSearchFilterChange = useCallback((search: string) => {
    debouncedSearchUpdateRef.current(search);
  }, []);

  return {
    visibility,
    changeVisibility: setVisibility,

    search,
    changeSearch: handleSearchFilterChange,

    category,
    changeCategory: setCategory,
  };
}
