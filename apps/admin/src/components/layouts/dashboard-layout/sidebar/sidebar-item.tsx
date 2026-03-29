import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { DynamicIcon } from '@repo/ui/lib/icons';

import { cn } from '@repo/ui/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/base/tooltip';

import type { LinkItem } from '../types';

interface SidebarItemProps {
  isCollapsed: boolean;
  link: LinkItem;
}

function SidebarItem(props: SidebarItemProps) {
  const { isCollapsed, link } = props;

  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (link.exactMatch) {
      return pathname === link.href;
    }

    return pathname.startsWith(link.href);
  }, [link.href, link.exactMatch, pathname]);

  const Icon = useMemo(() => {
    return <DynamicIcon name={link.icon} className={cn('size-5')} />;
  }, [link.icon]);

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={link.href}
            className={cn(
              'group relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
              isActive
                ? 'bg-[var(--baladi-sidebar-item-active)] text-white shadow-lg'
                : 'text-[var(--baladi-sidebar-text)] hover:bg-[var(--baladi-sidebar-item-hover)] hover:text-[var(--baladi-primary)]',
            )}
          >
            <span className="size-5">{Icon}</span>
            <span className="sr-only">{link.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="flex items-center gap-4 border-0 bg-[var(--baladi-dark)] text-white shadow-xl"
        >
          {link.title}
          {link.label && (
            <span className="ml-auto text-gray-300">{link.label}</span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(
        'group relative mx-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-[var(--baladi-sidebar-item-active)] text-white shadow-md'
          : 'text-[var(--baladi-sidebar-text)] hover:bg-[var(--baladi-sidebar-item-hover)] hover:text-[var(--baladi-primary)]',
      )}
    >
      <span className="h-5 w-5 flex-shrink-0">{Icon}</span>
      <span className="truncate font-[family-name:var(--font-dm-sans)]">
        {link.title}
      </span>
      {link.label && (
        <span
          className={cn(
            'ml-auto text-xs',
            isActive ? 'text-white' : 'text-[var(--baladi-gray)]',
          )}
        >
          {link.label}
        </span>
      )}

      {isActive && (
        <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[var(--baladi-accent)]" />
      )}
    </Link>
  );
}

export default memo(SidebarItem);
