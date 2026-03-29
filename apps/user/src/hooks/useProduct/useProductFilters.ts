import debounce from 'lodash.debounce';
import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';
import { useRef, useEffect, useCallback } from 'react';

import { ProductSort, ProductStock } from './types';

export function useProductFilters() {
  const [search, setSearch] = useQueryState('search', parseAsString);
  const [category, setCategory] = useQueryState('category', parseAsString);
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringEnum<ProductSort>(Object.values(ProductSort)).withDefault(
      ProductSort.POPULARITY,
    ),
  );
  const [stock, setStock] = useQueryState(
    'stock',
    parseAsStringEnum<ProductStock>(Object.values(ProductStock)).withDefault(
      ProductStock.ALL,
    ),
  );
  const [minPrice, setMinPrice] = useQueryState(
    'minPrice',
    parseAsString.withDefault('0'),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    'maxPrice',
    parseAsString.withDefault('0'),
  );

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string | null) => {
      setSearch(search);
    }, 400),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;
    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    if (search.length === 0) {
      debouncedSearchUpdateRef.current(null);
    } else {
      debouncedSearchUpdateRef.current(search);
    }
  }, []);

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category.length === 0) {
        setCategory(null);
      } else {
        setCategory(category);
      }
    },
    [setCategory],
  );

  const handleSortChange = useCallback(
    (sort: ProductSort) => {
      if (sort === ProductSort.POPULARITY) {
        setSort(null);
      } else {
        setSort(sort);
      }
    },
    [setSort],
  );

  const handleStockChange = useCallback(
    (stock: ProductStock) => {
      if (stock === ProductStock.ALL) {
        setStock(null);
      } else {
        setStock(stock);
      }
    },
    [setStock],
  );

  const handleMinPriceChange = useCallback(
    (minPrice: number) => {
      if (minPrice === 0) {
        setMinPrice(null);
      } else {
        setMinPrice(minPrice.toString());
      }
    },
    [setMinPrice],
  );

  const handleMaxPriceChange = useCallback(
    (maxPrice: number) => {
      if (maxPrice === 0) {
        setMaxPrice(null);
      } else {
        setMaxPrice(maxPrice.toString());
      }
    },
    [setMaxPrice],
  );

  return {
    search,
    category,
    handleSearchChange,
    handleCategoryChange,

    sort,
    stock,
    handleSortChange,
    handleStockChange,

    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
}
