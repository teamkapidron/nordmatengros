import { memo } from 'react';
import Header from './header';
import ProfileDropdown from './profile-dropdown';

function TopBar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-[var(--baladi-border)] bg-white px-6 py-4 shadow-sm">
      <Header />
      <ProfileDropdown />
    </div>
  );
}

export default memo(TopBar);
