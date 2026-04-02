'use client';

// Node Modules
import { z } from '@repo/ui/lib/form';
import { memo, useCallback, useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Download,
  AlertTriangle,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Alert, AlertDescription } from '@repo/ui/components/base/alert';

// Hooks
import { useBulk } from '@/hooks/useBulk';

// Types
import { CsvConfigType } from '@/hooks/useBulk/types';

interface CsvUploadBoxProps {
  title?: string;
  description?: string;
  templateFileName?: string;
  csvConfig: CsvConfigType;
  csvSchema: z.ZodType;
}

function CsvUploadBox(props: CsvUploadBoxProps) {
  const {
    title = 'Last opp CSV-fil',
    description = 'Last opp en CSV-fil for bulk import',
    templateFileName = 'template.csv',
    csvConfig,
    csvSchema,
  } = props;

  const {
    isUploading,
    parseResult,
    fileName,
    uploadKey,
    fileInputRef,
    handleFileUpload,
    triggerFileInput,
    downloadTemplate,
    resetUpload,
    handleFileInputChange,
  } = useBulk(csvConfig, csvSchema);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (isUploading) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file) {
          handleFileUpload(file);
        }
      }
    },
    [isUploading, handleFileUpload],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      if (e.dataTransfer.types.includes('Files')) {
        setIsDragOver(true);
      }
    },
    [isUploading],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      if (e.dataTransfer.types.includes('Files')) {
        setIsDragOver(true);
      }
    },
    [isUploading],
  );

  return (
    <div className="rounded-xl border border-[var(--nordmat-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="bg-[var(--nordmat-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Upload className="h-5 w-5 text-[var(--nordmat-primary)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--nordmat-primary)]">
            {title}
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
            {description}
          </p>
        </div>
      </div>

      {!parseResult && (
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onClick={triggerFileInput}
            className={`flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isDragOver
                ? 'bg-[var(--nordmat-primary)]/10 border-[var(--nordmat-primary)]'
                : isUploading
                  ? 'bg-[var(--nordmat-primary)]/5 cursor-not-allowed border-[var(--nordmat-primary)]'
                  : 'hover:bg-[var(--nordmat-primary)]/5 border-[var(--nordmat-border)] bg-gray-50 hover:border-[var(--nordmat-primary)]'
            }`}
          >
            <div className="text-center">
              {isUploading ? (
                <>
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-[var(--nordmat-primary)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--nordmat-primary)]">
                    Behandler CSV-fil...
                  </p>
                  {fileName && (
                    <p className="mt-2 text-sm text-[var(--nordmat-gray)]">
                      {fileName}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <FileText className="mx-auto h-12 w-12 text-[var(--nordmat-gray)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--nordmat-primary)]">
                    {isDragOver
                      ? 'Slipp filen her'
                      : `Dra og slipp ${csvConfig.acceptedFileTypes?.join('/')} fil her eller klikk for å velge`}
                  </p>
                  <p className="mt-2 text-sm text-[var(--nordmat-gray)]">
                    Maks {csvConfig.maxFileSize}MB • Kun{' '}
                    {csvConfig.acceptedFileTypes?.join(', ')} filer
                  </p>
                </>
              )}
            </div>
          </div>

          <input
            key={uploadKey}
            ref={fileInputRef}
            type="file"
            accept={csvConfig.acceptedFileTypes?.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
            aria-label="CSV fil upload"
          />

          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadTemplate(templateFileName)}
              className="border-[var(--nordmat-border)] text-[var(--nordmat-primary)] hover:bg-[var(--nordmat-primary)] hover:text-white"
              disabled={isUploading}
            >
              <Download className="mr-2 h-4 w-4" />
              Laste ned mal
            </Button>
          </div>
        </div>
      )}

      {parseResult && (
        <div className="space-y-4">
          <div
            className={`rounded-lg border p-4 ${
              parseResult.success
                ? 'border-[var(--nordmat-success)]/20 bg-[var(--nordmat-success)]/5'
                : 'border-[var(--nordmat-error)]/20 bg-[var(--nordmat-error)]/5'
            }`}
          >
            <div className="flex items-center gap-3">
              {parseResult.success ? (
                <CheckCircle className="h-6 w-6 text-[var(--nordmat-success)]" />
              ) : (
                <XCircle className="h-6 w-6 text-[var(--nordmat-error)]" />
              )}
              <div>
                <h3
                  className={`font-[family-name:var(--font-sora)] font-semibold ${
                    parseResult.success
                      ? 'text-[var(--nordmat-success)]'
                      : 'text-[var(--nordmat-error)]'
                  }`}
                >
                  {parseResult.success
                    ? 'CSV behandlet vellykket!'
                    : 'CSV behandling feilet'}
                </h3>
                <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--nordmat-gray)]">
                  <span>Totale rader: {parseResult.totalRows}</span>
                  <span className="mx-2">•</span>
                  <span>Gyldige rader: {parseResult.validRows}</span>
                  {parseResult.errors.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-[var(--nordmat-error)]">
                        Feil: {parseResult.errors.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {parseResult.missingColumns.length > 0 && (
            <Alert className="border-[var(--nordmat-warning)]/20 bg-[var(--nordmat-warning)]/5">
              <AlertTriangle className="h-4 w-4 text-[var(--nordmat-warning)]" />
              <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
                <strong>Manglende påkrevde kolonner:</strong>{' '}
                {parseResult.missingColumns.join(', ')}
              </AlertDescription>
            </Alert>
          )}

          {parseResult.errors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[var(--nordmat-error)]" />
                <h4 className="font-[family-name:var(--font-sora)] font-medium text-[var(--nordmat-error)]">
                  Valideringsfeil ({parseResult.errors.length})
                </h4>
              </div>

              <div className="max-h-64 overflow-y-auto rounded-lg border border-[var(--nordmat-border)] bg-[var(--nordmat-muted)]">
                {parseResult.errors.slice(0, 50).map((error, index) => (
                  <div
                    key={`error-${uploadKey}-${index}-${error.row}-${error.column}`}
                    className="border-b border-[var(--nordmat-border)] p-3 last:border-b-0"
                  >
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                      <div className="flex items-center gap-2 text-[var(--nordmat-error)]">
                        <span className="font-medium">
                          Rad {error.row} • Kolonne: {error.column}
                        </span>
                      </div>
                      <div className="mt-1 text-[var(--nordmat-gray)]">
                        Verdi: &quot;{error.value}&quot;
                      </div>
                      <div className="mt-1 text-[var(--nordmat-dark)]">
                        {error.error}
                      </div>
                    </div>
                  </div>
                ))}
                {parseResult.errors.length > 50 && (
                  <div className="p-3 text-center text-sm text-[var(--nordmat-gray)]">
                    ... og {parseResult.errors.length - 50} flere feil
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={resetUpload}
              className="border-[var(--nordmat-border)] text-[var(--nordmat-primary)] hover:bg-[var(--nordmat-primary)] hover:text-white"
            >
              Last opp ny fil
            </Button>

            {parseResult.success &&
              parseResult.data &&
              parseResult.data.length > 0 && (
                <Button
                  type="button"
                  className="bg-[var(--nordmat-primary)] text-white hover:bg-[var(--nordmat-primary-dark)]"
                  onClick={() => {
                    console.log('Processing data:', parseResult.data);
                  }}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Behandler...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Behandle {parseResult.data.length} elementer
                    </>
                  )}
                </Button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CsvUploadBox);
