import { useCallback, useMemo } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { subDays, format, parse } from '@repo/ui/lib/date';

export function useDateRangeInParams(timeRange: number = 30) {
  const [from, setFrom] = useQueryState(
    'from',
    parseAsString.withDefault(
      format(subDays(new Date(), timeRange), 'yyyy-MM-dd'),
    ),
  );
  const [to, setTo] = useQueryState(
    'to',
    parseAsString.withDefault(format(new Date(), 'yyyy-MM-dd')),
  );

  const dateRange = useMemo(() => {
    const fromDate = parse(from, 'yyyy-MM-dd', new Date());
    const toDate = parse(to, 'yyyy-MM-dd', new Date());
    return { from: fromDate, to: toDate };
  }, [from, to]);

  const dateRangeInString = useMemo(() => {
    return {
      from,
      to,
    };
  }, [from, to]);

  const setDateRange = useCallback(
    (from: Date, to: Date) => {
      setFrom(format(from, 'yyyy-MM-dd'));
      setTo(format(to, 'yyyy-MM-dd'));
    },
    [setFrom, setTo],
  );

  return { dateRange, dateRangeInString, setDateRange };
}
