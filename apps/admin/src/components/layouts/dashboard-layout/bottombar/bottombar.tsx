import { cn } from '@repo/ui/lib/utils';
import { memo, useMemo } from 'react';

import BottomBarItem from './bottombar-item';

import type { LinkItem } from '../types';

interface BottomBarProps {
  className?: string;
  links: LinkItem[];
}

function BottomBar(props: BottomBarProps) {
  const { className, links } = props;

  const renderedLinks = useMemo(() => {
    return links.map((link) => <BottomBarItem key={link.href} {...link} />);
  }, [links]);

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--baladi-border)] bg-white shadow-lg',
        className,
      )}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {renderedLinks}
      </div>
    </div>
  );
}

export default memo(BottomBar);
