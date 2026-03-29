import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import { cn } from '@repo/ui/lib/utils';
import { useMediaQuery } from '@repo/ui/hooks/useMediaQuery';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@repo/ui/components/base/resizable';

import TopBar from './topbar/topbar';
import Sidebar from './sidebar/sidebar';

import type { LinkItem } from './types';

interface DesktopLayoutProps {
  sidebarSlice: number;
  sidebarLinks: LinkItem[];
  sidebarBottomLinks?: LinkItem[];
  children: React.ReactNode;
}

function DesktopLayout(props: DesktopLayoutProps) {
  const { children, sidebarLinks, sidebarSlice, sidebarBottomLinks } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1260px)');

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="fixed h-full max-h-screen min-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={88.2}
        collapsedSize={5}
        collapsible={isMobile ? false : true}
        minSize={isMobile ? 5 : 15}
        maxSize={isMobile ? 5 : 15}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        onResize={() => {
          setIsCollapsed(false);
        }}
        className={cn(
          'border-r border-[var(--baladi-sidebar-border)] bg-[var(--baladi-sidebar-bg)]',
          isCollapsed &&
            'h-screen min-w-[72px] transition-all duration-300 ease-in-out',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-[var(--baladi-border)] bg-white shadow-sm',
            isCollapsed ? 'justify-center px-3' : 'justify-start px-6',
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--baladi-primary)] p-2">
                <Image
                  alt="Baladi"
                  height={500}
                  width={500}
                  className="size-8"
                  src="/images/brand/logo.png"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)]">
                  Baladi
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                  Administrasjonsportal
                </span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--baladi-primary)] p-2">
              <Image
                alt="Baladi"
                height={24}
                width={24}
                className="h-6 w-6"
                src="/images/brand/logo.png"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col overflow-hidden py-6">
          <div className="flex-1 overflow-y-auto">
            <Sidebar
              isCollapsed={isCollapsed}
              links={sidebarLinks.slice(0, sidebarSlice)}
            />
          </div>

          <div
            className={cn(
              'my-4',
              isCollapsed
                ? 'mx-3 border-t border-[var(--baladi-sidebar-border)]'
                : 'mx-6 border-t border-[var(--baladi-sidebar-border)]',
            )}
          />

          <div className="flex-shrink-0">
            <Sidebar
              isCollapsed={isCollapsed}
              links={sidebarLinks.slice(sidebarSlice)}
            />
          </div>

          {sidebarBottomLinks && (
            <div className="flex-shrink-0">
              <Sidebar isCollapsed={isCollapsed} links={sidebarBottomLinks} />
            </div>
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={500}>
        <div className="flex h-screen flex-col bg-[var(--baladi-light)]">
          <TopBar />
          <div className="flex-grow overflow-y-auto p-5">{children}</div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default memo(DesktopLayout);
