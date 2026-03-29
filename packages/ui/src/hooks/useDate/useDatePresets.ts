import { useMemo, useCallback } from 'react';
import {
  subDays,
  subYears,
  startOfDay,
  endOfDay,
  differenceInDays,
  startOfYear,
  endOfYear,
} from '@repo/ui/lib/date';

export type PresetValue = '7d' | '14d' | '30d' | '1y' | 'prev_year';

export interface DatePresetOption {
  value: PresetValue;
  label: string;
  days: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface UseDatePresetsProps {
  dateRange: DateRange;
  setDateRange: (from: Date, to: Date) => void;
}

export interface UseDatePresetsReturn {
  presetOptions: readonly DatePresetOption[];
  currentPreset: PresetValue;
  handlePresetChange: (preset: string) => void;
  getDisplayText: () => string;
  totalDays: number;
}

export const presetOptions: readonly DatePresetOption[] = [
  { value: '7d' as const, label: 'Siste 7 dager', days: 7 },
  { value: '14d' as const, label: 'Siste 14 dager', days: 14 },
  { value: '30d' as const, label: 'Siste 30 dager', days: 30 },
  { value: '1y' as const, label: 'Siste år', days: 365 },
  { value: 'prev_year' as const, label: 'Forrige år', days: 0 },
] as const;

export function useDatePresets({
  dateRange,
  setDateRange,
}: UseDatePresetsProps): UseDatePresetsReturn {
  const currentPreset = useMemo<PresetValue>(() => {
    const now = new Date();
    const today = endOfDay(now);

    const lastYear = now.getFullYear() - 1;
    const prevYearStart = startOfYear(new Date(lastYear, 0, 1));
    const prevYearEnd = endOfYear(new Date(lastYear, 11, 31));

    if (
      Math.abs(differenceInDays(dateRange.from, prevYearStart)) <= 1 &&
      Math.abs(differenceInDays(dateRange.to, prevYearEnd)) <= 1
    ) {
      return 'prev_year';
    }

    for (const preset of presetOptions) {
      if (preset.value === 'prev_year') continue;

      const expectedFrom = startOfDay(subDays(now, preset.days - 1));
      if (
        Math.abs(differenceInDays(dateRange.from, expectedFrom)) <= 1 &&
        Math.abs(differenceInDays(dateRange.to, today)) <= 1
      ) {
        return preset.value;
      }
    }

    return '30d';
  }, [dateRange]);

  const handlePresetChange = useCallback(
    (preset: string) => {
      const presetValue = preset as PresetValue;
      const now = new Date();

      let fromDate: Date;
      let toDate: Date;

      const lastYear = now.getFullYear() - 1;

      switch (presetValue) {
        case '7d':
          fromDate = startOfDay(subDays(now, 6));
          toDate = endOfDay(now);
          break;
        case '14d':
          fromDate = startOfDay(subDays(now, 13));
          toDate = endOfDay(now);
          break;
        case '30d':
          fromDate = startOfDay(subDays(now, 29));
          toDate = endOfDay(now);
          break;
        case '1y':
          fromDate = startOfDay(subYears(now, 1));
          toDate = endOfDay(now);
          break;
        case 'prev_year':
          fromDate = startOfYear(new Date(lastYear, 0, 1));
          toDate = endOfYear(new Date(lastYear, 11, 31));
          break;
        default:
          fromDate = startOfDay(subDays(now, 29));
          toDate = endOfDay(now);
      }

      setDateRange(fromDate, toDate);
    },
    [setDateRange],
  );

  const getDisplayText = useCallback((): string => {
    const preset = presetOptions.find((p) => p.value === currentPreset);
    return preset?.label || 'Siste 30 dager';
  }, [currentPreset]);

  const totalDays = useMemo(() => {
    return (
      Math.ceil(
        (dateRange.to.getTime() - dateRange.from.getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1
    );
  }, [dateRange]);

  return {
    presetOptions,
    currentPreset,
    handlePresetChange,
    getDisplayText,
    totalDays,
  };
}
