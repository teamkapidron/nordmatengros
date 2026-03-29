import { memo, useMemo } from 'react';

import { cn } from '@repo/ui/lib/utils';
import SidebarItem from './sidebar-item';

import type { LinkItem } from '../types';

interface SidebarProps {
  links: LinkItem[];
  className?: string;
  isCollapsed: boolean;
}

function Sidebar(props: SidebarProps) {
  const { className, links, isCollapsed } = props;

  const sidebarItems = useMemo(() => {
    return links.map((link) => (
      <SidebarItem key={link.href} link={link} isCollapsed={isCollapsed} />
    ));
  }, [links, isCollapsed]);

  return (
    <nav
      className={cn(
        'flex w-full flex-col',
        isCollapsed ? 'items-center space-y-3 px-3' : 'space-y-1',
        className,
      )}
    >
      {sidebarItems}
    </nav>
  );
}

export default memo(Sidebar);
