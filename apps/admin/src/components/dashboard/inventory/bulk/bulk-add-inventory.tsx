'use client';

// Node Modules
import { useRouter } from 'next/navigation';
import { Package2, FileText, ArrowLeft } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import CsvUploadBox from '@/components/common/csv-upload-box';

// Constants
import { csvConfig, csvInventorySchema } from './schema';

export default function BulkAddInventory() {
  const router = useRouter();

  return (
    <div className="space-y-6 p-6">
      <div className="relative overflow-hidden rounded-xl border border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-primary)] to-[var(--baladi-secondary)] p-6 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-white/5"></div>
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Package2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-white lg:text-2xl">
                  Bulk Legg til Lager
                </h1>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                  Last opp en CSV-fil for å legge til flere lagervarer samtidig
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => router.push('/dashboard/inventory')}
              className="border-white/20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til Lager
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--baladi-accent)] via-white/50 to-[var(--baladi-accent)]"></div>
      </div>

      <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-[var(--baladi-info)]/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4 text-[var(--baladi-info)]" />
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-primary)]">
            Instruksjoner
          </h3>
        </div>

        <div className="space-y-3 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              1
            </span>
            <span>
              Last ned CSV-malen ved å klikke på &quot;Last ned mal&quot;
              knappen nedenfor
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              2
            </span>
            <span>
              Fyll ut CSV-filen med lagerinformasjon. Påkrevde felt: productId,
              quantity, location, status
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              3
            </span>
            <span>Last opp CSV-filen for validering og forhåndsvisning</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              4
            </span>
            <span>
              Rett opp eventuelle feil og last opp på nytt om nødvendig
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--baladi-primary)] text-xs font-bold text-white">
              5
            </span>
            <span>
              Klikk &quot;Importer lager&quot; for å fullføre importen
            </span>
          </div>
        </div>
      </div>

      <CsvUploadBox
        title="Last opp lagervarer fra CSV"
        description="Last opp en CSV-fil med lagerdata for bulk import"
        templateFileName="bulk_inventory_template.csv"
        csvConfig={csvConfig}
        csvSchema={csvInventorySchema}
      />
    </div>
  );
}
