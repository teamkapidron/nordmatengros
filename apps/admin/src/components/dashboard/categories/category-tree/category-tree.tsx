'use client';

// Node Modules
import { memo, useCallback, useMemo, useState } from 'react';
import { Plus, Search } from '@repo/ui/lib/icons';

// Components
import CategoryNode from './category-node';
import { Input } from '@repo/ui/components/base/input';
import { Button } from '@repo/ui/components/base/button';

// Hooks
import { useCategory } from '@/hooks/useCategory';

// Types
import type { HierarchicalCategory } from '@repo/types/category';
import CreateCategoryDialog from '../create-category/create-category-dialog';

function CategoryTree() {
  const { categories: data } = useCategory();
  const categories = useMemo(() => {
    return data?.categories || [];
  }, [data?.categories]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggleNode = useCallback(
    (categoryId: string) => {
      const newExpanded = new Set(expandedNodes);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      setExpandedNodes(newExpanded);
    },
    [expandedNodes],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const flattenCategories = useCallback(
    (cats: HierarchicalCategory[]): HierarchicalCategory[] => {
      const result: HierarchicalCategory[] = [];
      cats.forEach((cat) => {
        result.push(cat);
        if (cat.children) {
          result.push(...flattenCategories(cat.children));
        }
      });
      return result;
    },
    [],
  );

  const filteredCategories = useMemo(
    () =>
      searchQuery
        ? flattenCategories(categories).filter((category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : categories,
    [categories, flattenCategories, searchQuery],
  );

  return (
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--baladi-border)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
            Kategorier
          </h2>
          <CreateCategoryDialog>
            <Button
              size="sm"
              className="hover:bg-[var(--baladi-primary)]/90 h-8 bg-[var(--baladi-primary)]"
            >
              <Plus className="mr-1 h-3 w-3" />
              Legg til
            </Button>
          </CreateCategoryDialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--baladi-gray)]" />
          <Input
            placeholder="Søk kategorier..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-9 border-[var(--baladi-border)] pl-9 focus:border-[var(--baladi-primary)] focus:ring-1 focus:ring-[var(--baladi-primary)]"
          />
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredCategories.map((category) => (
            <CategoryNode
              key={category._id}
              category={category}
              level={0}
              onToggle={handleToggleNode}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CategoryTree);
