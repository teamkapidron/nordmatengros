import debounce from 'lodash.debounce';
import { parseAsString, useQueryState, parseAsStringEnum } from 'nuqs';
import { useCallback, useEffect, useRef } from 'react';

import { UserType } from '@repo/types/user';
import { UserStatusFilter } from './types';

export function useUserFilter(debounceDelay = 400) {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      clearOnDefault: true,
    }),
  );
  const [userType, setUserType] = useQueryState(
    'userType',
    parseAsStringEnum<UserType>(Object.values(UserType)),
  );
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<UserStatusFilter>(Object.values(UserStatusFilter))
      .withDefault(UserStatusFilter.ALL)
      .withOptions({
        clearOnDefault: true,
      }),
  );

  const debouncedSearchUpdateRef = useRef(
    debounce((search: string) => {
      setSearch(search);
    }, debounceDelay),
  );

  useEffect(() => {
    const searchUpdateRef = debouncedSearchUpdateRef.current;

    return () => {
      searchUpdateRef.cancel();
    };
  }, []);

  const handleSearchFilter = useCallback(
    (search: string) => {
      setSearch(search);
    },
    [setSearch],
  );

  const handleUserStatusFilter = useCallback(
    (status: UserStatusFilter) => {
      setStatus(status);
    },
    [setStatus],
  );

  const handleUserTypeFilter = useCallback(
    (userType: UserType | undefined) => {
      if (userType) {
        setUserType(userType);
      } else {
        setUserType(null);
      }
    },
    [setUserType],
  );

  return {
    search,
    userType,
    status,

    handleSearchFilter,
    handleUserStatusFilter,
    handleUserTypeFilter,
  };
}
