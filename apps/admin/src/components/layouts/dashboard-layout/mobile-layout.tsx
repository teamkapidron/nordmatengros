import { memo } from 'react';

import TopBar from './topbar/topbar';
import BottomBar from './bottombar/bottombar';

import type { LinkItem } from './types';

interface MobileLayoutProps {
  children: React.ReactNode;
  bottomBarLinks: LinkItem[];
}

function MobileLayout(props: MobileLayoutProps) {
  const { children, bottomBarLinks } = props;

  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex-grow overflow-y-auto bg-[#eceef5]">{children}</div>
      <BottomBar links={bottomBarLinks} />
    </div>
  );
}

export default memo(MobileLayout);
