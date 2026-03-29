'use client';

// Node Modules
import { format } from '@repo/ui/lib/date';
import React, { memo } from 'react';
import { Archive, Clock, TrendingUp } from '@repo/ui/lib/icons';

// Components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/base/select';
import AddInventoryDialog from './add-inventory-dialog/add-inventory-dialog';

// Hooks
import { useDatePresets } from '@repo/ui/hooks/useDate/useDatePresets';
import { useDateRangeInParams } from '@repo/ui/hooks/useDate/useDateRangeInParams';

function InventoryHeader() {
  const { dateRange, setDateRange } = useDateRangeInParams();
  const { presetOptions, currentPreset, handlePresetChange, getDisplayText } =
    useDatePresets({
      dateRange,
      setDateRange,
    });

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/5"></div>
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                Lager Dashboard
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Overvåk og administrer alle lageraktiviteter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white/60" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Sist oppdatert: {format(new Date(), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-white/60" />
              <span className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                Viser {getDisplayText()} data
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <Select value={currentPreset} onValueChange={handlePresetChange}>
              <SelectTrigger className="w-[160px] border-white/20 bg-white/10 font-[family-name:var(--font-dm-sans)] text-sm text-white backdrop-blur-sm hover:bg-white/20 focus:border-white/40 focus:ring-white/20">
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

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 p-1 backdrop-blur-sm">
              <AddInventoryDialog />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
    </div>
  );
}

export default memo(InventoryHeader);
