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
    <div className="rounded-xl border border-[var(--baladi-border)] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center space-x-3">
        <div className="bg-[var(--baladi-primary)]/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Upload className="h-5 w-5 text-[var(--baladi-primary)]" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-primary)]">
            {title}
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
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
                ? 'bg-[var(--baladi-primary)]/10 border-[var(--baladi-primary)]'
                : isUploading
                  ? 'bg-[var(--baladi-primary)]/5 cursor-not-allowed border-[var(--baladi-primary)]'
                  : 'hover:bg-[var(--baladi-primary)]/5 border-[var(--baladi-border)] bg-gray-50 hover:border-[var(--baladi-primary)]'
            }`}
          >
            <div className="text-center">
              {isUploading ? (
                <>
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-[var(--baladi-primary)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--baladi-primary)]">
                    Behandler CSV-fil...
                  </p>
                  {fileName && (
                    <p className="mt-2 text-sm text-[var(--baladi-gray)]">
                      {fileName}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <FileText className="mx-auto h-12 w-12 text-[var(--baladi-gray)]" />
                  <p className="mt-4 text-lg font-medium text-[var(--baladi-primary)]">
                    {isDragOver
                      ? 'Slipp filen her'
                      : `Dra og slipp ${csvConfig.acceptedFileTypes?.join('/')} fil her eller klikk for å velge`}
                  </p>
                  <p className="mt-2 text-sm text-[var(--baladi-gray)]">
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
              className="border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
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
                ? 'border-[var(--baladi-success)]/20 bg-[var(--baladi-success)]/5'
                : 'border-[var(--baladi-error)]/20 bg-[var(--baladi-error)]/5'
            }`}
          >
            <div className="flex items-center gap-3">
              {parseResult.success ? (
                <CheckCircle className="h-6 w-6 text-[var(--baladi-success)]" />
              ) : (
                <XCircle className="h-6 w-6 text-[var(--baladi-error)]" />
              )}
              <div>
                <h3
                  className={`font-[family-name:var(--font-sora)] font-semibold ${
                    parseResult.success
                      ? 'text-[var(--baladi-success)]'
                      : 'text-[var(--baladi-error)]'
                  }`}
                >
                  {parseResult.success
                    ? 'CSV behandlet vellykket!'
                    : 'CSV behandling feilet'}
                </h3>
                <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  <span>Totale rader: {parseResult.totalRows}</span>
                  <span className="mx-2">•</span>
                  <span>Gyldige rader: {parseResult.validRows}</span>
                  {parseResult.errors.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-[var(--baladi-error)]">
                        Feil: {parseResult.errors.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {parseResult.missingColumns.length > 0 && (
            <Alert className="border-[var(--baladi-warning)]/20 bg-[var(--baladi-warning)]/5">
              <AlertTriangle className="h-4 w-4 text-[var(--baladi-warning)]" />
              <AlertDescription className="font-[family-name:var(--font-dm-sans)]">
                <strong>Manglende påkrevde kolonner:</strong>{' '}
                {parseResult.missingColumns.join(', ')}
              </AlertDescription>
            </Alert>
          )}

          {parseResult.errors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[var(--baladi-error)]" />
                <h4 className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-error)]">
                  Valideringsfeil ({parseResult.errors.length})
                </h4>
              </div>

              <div className="max-h-64 overflow-y-auto rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)]">
                {parseResult.errors.slice(0, 50).map((error, index) => (
                  <div
                    key={`error-${uploadKey}-${index}-${error.row}-${error.column}`}
                    className="border-b border-[var(--baladi-border)] p-3 last:border-b-0"
                  >
                    <div className="font-[family-name:var(--font-dm-sans)] text-sm">
                      <div className="flex items-center gap-2 text-[var(--baladi-error)]">
                        <span className="font-medium">
                          Rad {error.row} • Kolonne: {error.column}
                        </span>
                      </div>
                      <div className="mt-1 text-[var(--baladi-gray)]">
                        Verdi: &quot;{error.value}&quot;
                      </div>
                      <div className="mt-1 text-[var(--baladi-dark)]">
                        {error.error}
                      </div>
                    </div>
                  </div>
                ))}
                {parseResult.errors.length > 50 && (
                  <div className="p-3 text-center text-sm text-[var(--baladi-gray)]">
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
              className="border-[var(--baladi-border)] text-[var(--baladi-primary)] hover:bg-[var(--baladi-primary)] hover:text-white"
            >
              Last opp ny fil
            </Button>

            {parseResult.success &&
              parseResult.data &&
              parseResult.data.length > 0 && (
                <Button
                  type="button"
                  className="bg-[var(--baladi-primary)] text-white hover:bg-[var(--baladi-primary-dark)]"
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
