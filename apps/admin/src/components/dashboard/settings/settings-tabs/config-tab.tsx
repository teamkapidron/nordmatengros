'use client';

// Node Modules
import React, { memo, useCallback } from 'react';
import { Settings } from '@repo/ui/lib/icons';

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import { Switch } from '@repo/ui/components/base/switch';
import { Label } from '@repo/ui/components/base/label';

// Hooks
import { useConfig } from '@/hooks/useSettings';

function ConfigTab() {
  const { getSiteConfigQuery, updateSiteConfigMutation } = useConfig();
  const { data: config } = getSiteConfigQuery;

  const handlePaletteToggle = useCallback(
    (checked: boolean) => {
      updateSiteConfigMutation.mutate({
        showPalette: checked,
      });
    },
    [updateSiteConfigMutation],
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--baladi-border)] bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 p-8 shadow-sm">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500"></div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[var(--baladi-accent)]"></div>
        </div>

        <div className="relative flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
            <Settings className="h-8 w-8 text-white" />
          </div>

          <div className="space-y-2">
            <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)]">
              Systemkonfigurasjon
            </h3>
            <p className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
              Administrer systeminnstillinger og visuelle preferanser
            </p>
          </div>
        </div>
      </div>

      <Card className="border-[var(--baladi-border)] shadow-lg">
        <CardHeader className="border-b border-[var(--baladi-border)]">
          <CardTitle className="flex items-center gap-3 font-[family-name:var(--font-sora)] text-xl text-[var(--baladi-dark)]">
            Palett innstillinger
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
            Styrer produktpallettinnstillingen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-1">
              <Label
                htmlFor="custom-palette"
                className="font-[family-name:var(--font-sora)] text-sm font-medium text-[var(--baladi-dark)]"
              >
                Aktiver palett
              </Label>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Slå på for å bruke palett
              </p>
            </div>
            <Switch
              id="custom-palette"
              checked={config?.config.showPalette}
              onCheckedChange={handlePaletteToggle}
              disabled={updateSiteConfigMutation.isPending}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ConfigTab);
