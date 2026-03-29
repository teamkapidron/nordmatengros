'use client';

// Node Modules
import { memo, useCallback, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  FolderOpenIcon,
} from '@repo/ui/lib/icons';

// Components
// import { Switch } from '@repo/ui/components/base/switch';

// Hooks
import { usePagination } from '@repo/ui/hooks/usePagination';
import { useProductFilters } from '@/hooks/useProduct/useProductFilters';

// Types
import type { HierarchicalCategory } from '@repo/types/category';

interface CategoryNodeProps {
  category: HierarchicalCategory;
  level: number;
  onToggle: (categoryId: string) => void;
  expandedNodes: Set<string>;
}

function CategoryNode(props: CategoryNodeProps) {
  const { category, level, onToggle, expandedNodes } = props;

  const { handlePageChange } = usePagination();
  const { category: selectedCategory, changeCategory } = useProductFilters();

  const isSelected = useMemo(() => {
    return selectedCategory === category._id;
  }, [selectedCategory, category._id]);

  const paddingLeft = level * 16 + 12;
  const isExpanded = expandedNodes.has(category._id);
  const hasChildren = category.children && category.children.length > 0;

  const handleChangeCategory = useCallback(() => {
    changeCategory(category._id);
    handlePageChange(1);
  }, [category._id, changeCategory, handlePageChange]);

  return (
    <div className="space-y-1">
      <div
        className={`group flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-[var(--baladi-primary)]/5 ${
          isSelected
            ? 'border-l-4 border-[var(--baladi-primary)] bg-[var(--baladi-primary)]/10'
            : ''
        }`}
        style={{ paddingLeft }}
      >
        {hasChildren ? (
          <button
            onClick={() => onToggle(category._id)}
            className="flex h-4 w-4 items-center justify-center rounded hover:bg-[var(--baladi-primary)]/10"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-[var(--baladi-gray)]" />
            ) : (
              <ChevronRight className="h-3 w-3 text-[var(--baladi-gray)]" />
            )}
          </button>
        ) : (
          <div className="h-4 w-4" />
        )}

        <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--baladi-primary)]/10">
          {isExpanded && hasChildren ? (
            <FolderOpenIcon className="h-4 w-4 text-[var(--baladi-primary)]" />
          ) : (
            <FolderIcon className="h-4 w-4 text-[var(--baladi-primary)]" />
          )}
        </div>

        <div
          onClick={handleChangeCategory}
          className="flex flex-1 cursor-pointer items-center justify-between"
        >
          <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
            {category.name}
          </span>
        </div>

        {/* <div className="flex items-center gap-2">
          <Switch
            checked={category.isActive}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          />
        </div> */}
      </div>

      {isExpanded && hasChildren && (
        <div className="space-y-1">
          {category.children!.map((child) => (
            <CategoryNode
              key={child._id}
              category={child}
              level={level + 1}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(CategoryNode);
