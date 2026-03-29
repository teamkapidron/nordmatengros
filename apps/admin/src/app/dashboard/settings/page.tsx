import { Metadata } from 'next';
import { Suspense } from 'react';

import SettingsHeader from '@/components/dashboard/settings/settings-header';
import SettingsTabs from '@/components/dashboard/settings/settings-tabs';

export const metadata: Metadata = {
  title: 'Innstillinger',
};

export default function SettingsPage() {
  return (
    <Suspense>
      <div className="space-y-6">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </Suspense>
  );
}
