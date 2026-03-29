'use client';

// Node Modules
import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';
import {
  LogIn,
  ChevronDown,
  LogOut,
  Package,
  Heart,
  MapPin,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/base/dropdown-menu';
import { Avatar, AvatarFallback } from '@repo/ui/components/base/avatar';

// Hooks
import { useAuth } from '@/hooks/useAuth';

function ProfileSection() {
  const { user, isAuthenticated, logoutMutation } = useAuth();

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const displayName = useMemo(
    () => user?.name || user?.email?.split('@')[0] || 'Bruker',
    [user?.name, user?.email],
  );

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-[var(--baladi-primary)]/5 hover:shadow-[var(--baladi-primary)]/20 group flex h-12 items-center gap-3 rounded-full border border-[var(--baladi-border)] bg-white/80 px-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--baladi-primary)] hover:shadow-lg"
          >
            <Avatar className="border-[var(--baladi-primary)]/20 group-hover:border-[var(--baladi-primary)]/40 h-8 w-8 border-2 transition-all duration-300">
              <AvatarFallback className="bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] font-[family-name:var(--font-sora)] text-xs font-bold text-white">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="hidden flex-col items-start lg:flex">
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)] transition-colors duration-300 group-hover:text-[var(--baladi-primary)]">
                {displayName}
              </span>
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                Min konto
              </span>
            </div>

            <ChevronDown
              size={16}
              className="text-[var(--baladi-gray)] transition-all duration-300 group-hover:text-[var(--baladi-primary)] group-data-[state=open]:rotate-180"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 border-[var(--baladi-border)] bg-white/95 shadow-xl backdrop-blur-sm"
          sideOffset={8}
        >
          <div className="px-3 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="border-[var(--baladi-primary)]/20 h-10 w-10 border-2">
                <AvatarFallback className="bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] font-[family-name:var(--font-sora)] text-sm font-bold text-white">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                  {displayName}
                </p>
                <p className="truncate font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="bg-[var(--baladi-border)]" />

          <DropdownMenuItem asChild>
            <Link
              href="/order/list"
              className="flex cursor-pointer items-center gap-3 px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-colors hover:bg-[var(--baladi-light)] focus:bg-[var(--baladi-light)]"
            >
              <Package size={16} className="text-[var(--baladi-primary)]" />
              <span>Mine bestillinger</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/wishlist"
              className="flex cursor-pointer items-center gap-3 px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-colors hover:bg-[var(--baladi-light)] focus:bg-[var(--baladi-light)]"
            >
              <Heart size={16} className="text-[var(--baladi-primary)]" />
              <span>Ønskeliste</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/address/list"
              className="flex cursor-pointer items-center gap-3 px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm transition-colors hover:bg-[var(--baladi-light)] focus:bg-[var(--baladi-light)]"
            >
              <MapPin size={16} className="text-[var(--baladi-primary)]" />
              <span>Adresser</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-[var(--baladi-border)]" />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm text-red-600 transition-colors hover:bg-red-50 focus:bg-red-50"
          >
            <LogOut size={16} />
            <span>{logoutMutation.isPending ? 'Logger ut...' : 'Logg ut'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center">
      <Button className="hover:shadow-[var(--baladi-primary)]/25 group relative h-12 overflow-hidden rounded-full bg-gradient-to-r from-[var(--baladi-primary)] to-[var(--baladi-secondary)] px-6 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <Link href="/login">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex items-center gap-2">
            <LogIn
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
            <span className="hidden sm:inline">Logg Inn</span>
            <span className="sm:hidden">Inn</span>
          </div>

          <div className="absolute inset-0 scale-0 rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-100" />
        </Link>
      </Button>
    </div>
  );
}

export default memo(ProfileSection);
