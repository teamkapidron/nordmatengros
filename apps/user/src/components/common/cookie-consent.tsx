'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import React, { memo, useState, useEffect, useCallback } from 'react';
import { X, Cookie } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';

const COOKIE_NAME = 'nordmat-cookie-consent';
const COOKIE_DATE_NAME = 'nordmat-cookie-consent-date';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_NAME, 'accepted');
    localStorage.setItem(COOKIE_DATE_NAME, new Date().toISOString());
    setIsVisible(false);
  }, []);

  const handleReject = useCallback(() => {
    localStorage.setItem(COOKIE_NAME, 'rejected');
    localStorage.setItem(COOKIE_DATE_NAME, new Date().toISOString());
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <React.Fragment>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 w-full transform border-t border-[var(--nordmat-border)] bg-white shadow-2xl transition-all duration-300 ease-in-out',
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-start gap-4">
              <div className="bg-[var(--nordmat-primary)]/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                <Cookie className="h-6 w-6 text-[var(--nordmat-primary)]" />
              </div>

              <div className="flex-1">
                <h3 className="mb-2 font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--nordmat-dark)]">
                  Vi bruker informasjonskapsler
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-[var(--nordmat-gray)] lg:text-base">
                  Vi bruker informasjonskapsler for å forbedre din opplevelse på
                  vårt nettsted, analysere trafikk og personalisere innhold. Ved
                  å fortsette å bruke nettsiden vår samtykker du til vår bruk av
                  informasjonskapsler.{' '}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-[var(--nordmat-primary)] underline transition-colors hover:text-[var(--nordmat-secondary)]"
                  >
                    Les mer om våre retningslinjer for personvern
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-shrink-0">
              <Button
                variant="outline"
                onClick={handleReject}
                className="w-full border-[var(--nordmat-border)] text-[var(--nordmat-gray)] hover:bg-[var(--nordmat-muted)] hover:text-[var(--nordmat-dark)] sm:w-auto"
              >
                Avvis alle
              </Button>
              <Button
                onClick={handleAccept}
                className="w-full bg-gradient-to-r from-[var(--nordmat-primary)] to-[var(--nordmat-secondary)] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-[var(--nordmat-secondary)] hover:to-[var(--nordmat-primary)] hover:shadow-xl sm:w-auto"
              >
                Godta alle
              </Button>
            </div>

            <Button
              variant="ghost"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--nordmat-gray)] transition-colors hover:bg-[var(--nordmat-muted)] hover:text-[var(--nordmat-dark)] lg:relative lg:right-0 lg:top-0"
              aria-label="Lukk"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-[var(--nordmat-primary)] to-[var(--nordmat-secondary)]" />
      </div>
    </React.Fragment>
  );
}

export default memo(CookieConsent);
