import type { IconName } from '@repo/ui/lib/icons';

export interface LinkItem {
  href: string;
  title: string;
  label?: string;
  icon: IconName;
  selectedIcon?: IconName;
  exactMatch?: boolean;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarLinks: LinkItem[];
  sidebarBottomLinks?: LinkItem[];
  bottomBarLinks: LinkItem[];
  sidebarSlice?: number;
}
