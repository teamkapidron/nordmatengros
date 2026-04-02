import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { Mail, MapPin, ShoppingCart, Heart, Package } from '@repo/ui/lib/icons';

interface FooterProps {
  className?: string;
}

function Footer(props: FooterProps) {
  const { className } = props;

  const quickLinks = [
    {
      name: 'Handlekurv',
      href: '/cart',
      icon: ShoppingCart,
      description: 'Se dine valgte produkter',
    },
    {
      name: 'Ønskeliste',
      href: '/wishlist',
      icon: Heart,
      description: 'Dine favoritt produkter',
    },
    {
      name: 'Mine bestillinger',
      href: '/orders',
      icon: Package,
      description: 'Se ordrehistorikk',
    },
    {
      name: 'Mine adresser',
      href: '/addresses',
      icon: MapPin,
      description: 'Administrer leveringsadresser',
    },
  ];

  return (
    <footer
      className={cn(
        'bg-gradient-to-br from-[var(--nordmat-dark)] via-[var(--nordmat-primary-dark)] to-[var(--nordmat-dark)] text-white',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-1">
              <div className="mb-8 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/brand/icon.png"
                    alt="Nordmat Engros Logo"
                    width={56}
                    height={56}
                    className="h-14 w-auto object-contain"
                  />
                </div>
              </div>

              <p className="font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-white/80">
                Vi leverer høykvalitets engrosprodukter til bedrifter over hele
                Norge. Med fokus på kvalitet, service og konkurransedyktige
                priser.
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-white">
                  Hurtiglenker
                </h3>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[var(--nordmat-accent)] to-[var(--nordmat-secondary)]" />
              </div>

              <div className="space-y-5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group block transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="hover:border-[var(--nordmat-accent)]/30 flex items-center space-x-4 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      <div className="from-[var(--nordmat-accent)]/20 to-[var(--nordmat-secondary)]/20 group-hover:from-[var(--nordmat-accent)]/30 group-hover:to-[var(--nordmat-secondary)]/30 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300">
                        <link.icon
                          size={20}
                          className="text-[var(--nordmat-accent)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white transition-colors duration-300 group-hover:text-[var(--nordmat-accent)]">
                          {link.name}
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="mb-8">
                <h3 className="mb-2 font-[family-name:var(--font-sora)] text-xl font-semibold text-white">
                  Kontaktinformasjon
                </h3>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[var(--nordmat-accent)] to-[var(--nordmat-secondary)]" />
              </div>

              <div className="space-y-6">
                <div className="hover:border-[var(--nordmat-accent)]/30 group flex items-start space-x-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <div className="from-[var(--nordmat-accent)]/20 to-[var(--nordmat-secondary)]/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
                    <Mail size={20} className="text-[var(--nordmat-accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-white/70">
                      E-POST
                    </p>
                    <Link
                      href="mailto:post@nordmatengros.com"
                      className="font-[family-name:var(--font-dm-sans)] text-base text-white transition-colors duration-300 hover:text-[var(--nordmat-accent)]"
                    >
                      post@nordmatengros.com
                    </Link>
                  </div>
                </div>

                <div className="hover:border-[var(--nordmat-accent)]/30 group flex items-start space-x-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <div className="from-[var(--nordmat-accent)]/20 to-[var(--nordmat-secondary)]/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
                    <MapPin
                      size={20}
                      className="text-[var(--nordmat-accent)]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-semibold uppercase tracking-wider text-white/70">
                      ADRESSE
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-white">
                      Andersrudveien 1, 1914
                      <br />
                      Ytre Enebakk, Norge
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="shadow-[var(--nordmat-accent)]/2 hover:shadow-[var(--nordmat-accent)]/40 group inline-flex cursor-pointer items-center space-x-3 rounded-xl bg-gradient-to-r from-[var(--nordmat-secondary)] to-[var(--nordmat-accent)] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Mail
                      size={20}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="font-[family-name:var(--font-dm-sans)] text-base">
                      Kontakt oss
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/70">
              © {new Date().getFullYear()} Nordmat Engros AS. Alle rettigheter
              forbeholdt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
