import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Personvernregler | Baladi Engros',
};

export default function PrivacyPolicyPage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="mb-4 font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)] md:text-4xl">
                Personvernregler
              </h1>
              <p className="mx-auto max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)]">
                Vi respekterer ditt personvern og forplikter oss til å beskytte
                dine personopplysninger
              </p>
            </div>

            <div className="rounded-lg border border-[var(--baladi-border)] bg-white p-8 shadow-sm">
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                    Informasjonskapsler (Cookies)
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                    Vi bruker informasjonskapsler for å forbedre din opplevelse
                    på vårt nettsted. Disse små datafilene lagres på enheten din
                    og hjelper oss med å:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                    <li>Huske dine preferanser og innstillinger</li>
                    <li>Analysere nettstedstrafikk og bruksmønstre</li>
                    <li>Forbedre nettstedets funksjonalitet og ytelse</li>
                    <li>Personalisere innhold basert på dine interesser</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                    Typer informasjonskapsler vi bruker
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-dark)]">
                        Nødvendige informasjonskapsler
                      </h3>
                      <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Disse er essensielle for at nettsiden skal fungere og
                        kan ikke deaktiveres.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-dark)]">
                        Analytiske informasjonskapsler
                      </h3>
                      <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Hjelper oss å forstå hvordan besøkende bruker nettsiden
                        vårt.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-sora)] font-medium text-[var(--baladi-dark)]">
                        Funksjonelle informasjonskapsler
                      </h3>
                      <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                        Forbedrer funksjonaliteten og personaliseringen av
                        nettsiden.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                    Dine rettigheter
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                    Du har rett til å kontrollere hvordan informasjonskapsler
                    brukes på vårt nettsted. Du kan når som helst endre dine
                    preferanser ved å:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                    <li>Endre innstillingene i nettleseren din</li>
                    <li>Slette eksisterende informasjonskapsler</li>
                    <li>Blokkere framtidige informasjonskapsler</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                    Kontakt oss
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                    Hvis du har spørsmål om våre personvernregler eller bruk av
                    informasjonskapsler, kan du kontakte oss på{' '}
                    <a
                      href="/contact"
                      className="font-medium text-[var(--baladi-primary)] underline transition-colors hover:text-[var(--baladi-secondary)]"
                    >
                      kontaktsiden vår
                    </a>
                    .
                  </p>
                </section>

                <div className="mt-8 rounded-lg bg-[var(--baladi-primary)]/5 p-4">
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                    <strong>Sist oppdatert:</strong>{' '}
                    {new Date().toLocaleDateString('nb-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
