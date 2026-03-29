'use client';

// Node Modules
import { memo } from 'react';
import { format } from '@repo/ui/lib/date';
import { Calendar, Clock, Filter } from '@repo/ui/lib/icons';

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';

// Hooks
import { useDatePresets } from '@repo/ui/hooks/useDate/useDatePresets';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

function DashboardHeader() {
  const { dateRange, setDateRange } = useDateRangeInParams(30);
  const {
    presetOptions,
    currentPreset,
    handlePresetChange,
    getDisplayText,
    totalDays,
  } = useDatePresets({ dateRange, setDateRange });

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-lg ring-1 ring-[var(--baladi-border)]">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
            Dashbord oversikt
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Overvåk din forretningsytelse og nøkkeltall
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[var(--baladi-light)] px-3 py-2">
          <Clock className="h-4 w-4 text-[var(--baladi-gray)]" />
          <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Oppdatert: {format(new Date(), 'MMM d, h:mm a')}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[var(--baladi-primary)]" />
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
              Tidsperiode:
            </span>
          </div>

          <div className="bg-[var(--baladi-primary)]/5 rounded-lg px-3 py-1.5">
            <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)]">
              {getDisplayText()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={currentPreset} onValueChange={handlePresetChange}>
            <SelectTrigger className="w-[160px] border-[var(--baladi-border)] bg-white font-[family-name:var(--font-dm-sans)] text-sm hover:border-[var(--baladi-primary)]">
              <SelectValue placeholder="Velg periode" />
            </SelectTrigger>
            <SelectContent>
              {presetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg bg-[var(--baladi-light)] p-3">
          <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Calendar className="h-5 w-5 text-[var(--baladi-primary)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
              Datoområde
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
              {totalDays} dager
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[var(--baladi-light)] p-3">
          <div className="bg-[var(--baladi-success)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Calendar className="h-5 w-5 text-[var(--baladi-success)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
              Fra dato
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
              {format(dateRange.from, 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[var(--baladi-light)] p-3">
          <div className="bg-[var(--baladi-info)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Calendar className="h-5 w-5 text-[var(--baladi-info)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-gray)]">
              Til dato
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold text-[var(--baladi-dark)]">
              {format(dateRange.to, 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DashboardHeader);
