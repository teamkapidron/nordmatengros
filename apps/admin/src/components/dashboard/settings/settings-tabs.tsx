'use client';

// Node Modules
import { memo } from 'react';
import { User, Shield } from '@repo/ui/lib/icons';

// Components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/base/tabs';
import ProfileTab from './settings-tabs/profile-tab';
import AdminTab from './settings-tabs/admin-tab';

function SettingsTabs() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-[var(--baladi-border)] bg-white shadow-lg">
        <Tabs defaultValue="profile" className="w-full">
          <div className="bg-gray-50/50 px-8 pt-8 pb-0">
            <TabsList className="min-h-16 w-full rounded-xl border border-[var(--baladi-border)] bg-white p-1 shadow-sm">
              <TabsTrigger
                value="profile"
                className="flex flex-1 items-center justify-center gap-4 rounded-lg px-8 py-5 font-[family-name:var(--font-dm-sans)] text-base font-medium transition-all duration-200 data-[state=active]:bg-[var(--baladi-primary)] data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                <User className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">Profil</div>
                  <div className="text-sm opacity-75">Brukerinnstillinger</div>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="admin"
                className="flex flex-1 items-center justify-center gap-4 rounded-lg px-8 py-5 font-[family-name:var(--font-dm-sans)] text-base font-medium transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                <Shield className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">Admin</div>
                  <div className="text-sm opacity-75">Brukerstyring</div>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-8">
            <TabsContent value="profile" className="mt-0 focus:outline-none">
              <div className="animate-in fade-in-50 duration-200">
                <ProfileTab />
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-0 focus:outline-none">
              <div className="animate-in fade-in-50 duration-200">
                <AdminTab />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default memo(SettingsTabs);
