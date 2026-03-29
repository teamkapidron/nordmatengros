'use client';

import React, { memo } from 'react';

import MobileLayout from './mobile-layout';
import DesktopLayout from './desktop-layout';

import type { DashboardLayoutProps } from './types';

function DashboardLayout(props: DashboardLayoutProps) {
  const {
    children,
    bottomBarLinks,
    sidebarLinks,
    sidebarSlice,
    sidebarBottomLinks,
  } = props;

  return (
    <React.Fragment>
      <div className="hidden md:block">
        <DesktopLayout
          sidebarLinks={sidebarLinks}
          sidebarSlice={sidebarSlice ?? 10}
          sidebarBottomLinks={sidebarBottomLinks}
        >
          {children}
        </DesktopLayout>
      </div>
      <div className="md:hidden">
        <MobileLayout bottomBarLinks={bottomBarLinks}>{children}</MobileLayout>
      </div>
    </React.Fragment>
  );
}

export default memo(DashboardLayout);
