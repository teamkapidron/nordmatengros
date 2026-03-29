'use client';

// Node Modules
import { memo, useState, useCallback, useMemo } from 'react';
import { Search, X, Grid3X3 } from '@repo/ui/lib/icons';

// Components
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import GetCategoryIcon from '@/components/common/get-category-icon';

// Hooks
import { useCategoryFlattened } from '@/hooks/useCategory';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

function SearchSection() {
  const { categoriesFlattened } = useCategoryFlattened();
  const { search, category, handleSearchChange, handleCategoryChange } =
    useProductFilters();

  const categories = useMemo(() => {
    return categoriesFlattened?.categories ?? [];
  }, [categoriesFlattened]);

  const [searchQuery, setSearchQuery] = useState<string>(search ?? '');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearchChange(e.target.value);
    },
    [handleSearchChange],
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    handleSearchChange('');
  }, [handleSearchChange]);

  const handleCategorySelect = useCallback(
    (value: string) => {
      handleCategoryChange(value === 'all' ? '' : value);
    },
    [handleCategoryChange],
  );

  return (
    <div className="w-full">
      <div className="flex items-center space-x-3">
        <div className="hidden lg:block">
          <Select
            value={category ? category : 'all'}
            onValueChange={handleCategorySelect}
          >
            <SelectTrigger className="w-48 rounded-full border-[var(--baladi-border)] bg-[var(--baladi-muted)] font-[family-name:var(--font-dm-sans)] text-sm transition-all duration-200 hover:border-[var(--baladi-primary)] focus:border-[var(--baladi-primary)] focus:ring-2 focus:ring-[var(--baladi-primary)]/20">
              <div className="flex items-center space-x-2">
                <SelectValue
                  placeholder="Alle kategorier"
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-96 w-48 rounded-xl border-[var(--baladi-border)] bg-white shadow-xl">
              <SelectItem
                value="all"
                className="font-[family-name:var(--font-dm-sans)] text-sm hover:bg-[var(--baladi-muted)] focus:bg-[var(--baladi-muted)]"
              >
                <div className="flex items-center space-x-3">
                  <Grid3X3 size={16} className="text-[var(--baladi-gray)]" />
                  <span>Alle kategorier</span>
                </div>
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat._id}
                  value={cat._id}
                  className="font-[family-name:var(--font-dm-sans)] text-sm hover:bg-[var(--baladi-muted)] focus:bg-[var(--baladi-muted)]"
                >
                  <div className="flex items-center space-x-3">
                    <GetCategoryIcon categoryName={cat.name} />
                    <span>{cat.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center">
            <Search size={20} className="z-10 text-[var(--baladi-primary)]" />
          </div>
          <Input
            type="text"
            placeholder="Søk etter produkter, kategorier eller merker..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full rounded-full border-[var(--baladi-border)] bg-[var(--baladi-muted)] py-3 pr-16 pl-12 font-[family-name:var(--font-dm-sans)] text-sm transition-all duration-200 placeholder:text-[var(--baladi-gray)] hover:border-[var(--baladi-primary)] focus:border-[var(--baladi-primary)] focus:ring-2 focus:ring-[var(--baladi-primary)]/20"
          />

          {searchQuery && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-7 w-7 rounded-full p-0 text-[var(--baladi-gray)] hover:bg-[var(--baladi-primary)]/10 hover:text-[var(--baladi-primary)]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 lg:hidden">
        <Select value={category || 'all'} onValueChange={handleCategorySelect}>
          <SelectTrigger className="w-full rounded-full border-[var(--baladi-border)] bg-[var(--baladi-muted)] font-[family-name:var(--font-dm-sans)] text-sm transition-all duration-200 hover:border-[var(--baladi-primary)] focus:border-[var(--baladi-primary)] focus:ring-2 focus:ring-[var(--baladi-primary)]/20">
            <div className="flex items-center space-x-2">
              <SelectValue placeholder="Velg kategori" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-96 w-full rounded-xl border-[var(--baladi-border)] bg-white shadow-xl">
            <SelectItem
              value="all"
              className="font-[family-name:var(--font-dm-sans)] text-sm hover:bg-[var(--baladi-muted)] focus:bg-[var(--baladi-muted)]"
            >
              <div className="flex items-center space-x-3">
                <Grid3X3 size={16} className="text-[var(--baladi-gray)]" />
                <span>Alle kategorier</span>
              </div>
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem
                key={cat._id}
                value={cat._id}
                className="font-[family-name:var(--font-dm-sans)] text-sm hover:bg-[var(--baladi-muted)] focus:bg-[var(--baladi-muted)]"
              >
                <div className="flex items-center space-x-3">
                  <GetCategoryIcon categoryName={cat.name} />
                  <span>{cat.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default memo(SearchSection);
