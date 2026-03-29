'use client';

import { memo, useCallback } from 'react';
import { LogOut } from '@repo/ui/lib/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import { Avatar, AvatarFallback } from '@repo/ui/components/base/avatar';

import { useAuth } from '@/hooks/useAuth';

function ProfileDropdown() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer border border-[var(--baladi-border)] text-base hover:bg-[var(--baladi-light)]">
          <AvatarFallback className="bg-[var(--baladi-primary)]/10 text-[var(--baladi-primary)]">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ProfileDropdown);
