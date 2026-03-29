'use client';

// Node Modules
import { memo } from 'react';
import { Mail, MapPin } from '@repo/ui/lib/icons';

// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';

// Components
import ContactForm from './contact-form';

function ContactContent() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'E-post',
      content: 'baladi.engros@gmail.com',
      description: 'Send oss en e-post',
      href: 'mailto:baladi.engros@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Andersrudveien 1, 1914 Ytre Enebakk, Norge',
      description: 'Besøk vårt lager',
      href: 'https://maps.google.com/?q=Andersrudveien+1,+1914+Ytre+Enebakk,+Norge',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-sora)] text-4xl font-bold text-[var(--baladi-dark)] md:text-5xl">
          Kontakt oss
        </h1>
        <p className="mx-auto max-w-3xl font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)] md:text-xl">
          Vi er her for å hjelpe deg med alle dine engrosprodukter. Ta kontakt
          med oss i dag for å diskutere dine behov eller få svar på spørsmål.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {contactInfo.map((info, index) => (
          <Card
            key={index}
            className="group border-[var(--baladi-border)] bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="pb-4">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)]">
                  <info.icon size={28} className="text-white" />
                </div>
              </div>
              <CardTitle className="text-center font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                {info.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {info.href ? (
                <a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 block font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-secondary)]"
                >
                  {info.content}
                </a>
              ) : (
                <p className="mb-2 font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-primary)]">
                  {info.content}
                </p>
              )}
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                {info.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-1">
        <div>
          <h2 className="mb-6 font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)]">
            Send oss en melding
          </h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

export default memo(ContactContent);
