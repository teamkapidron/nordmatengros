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
        'bg-gradient-to-br from-[var(--baladi-dark)] via-[var(--baladi-primary-dark)] to-[var(--baladi-dark)] text-white',
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
                    src="/images/brand/logo.png"
                    alt="Baladi Engros Logo"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-white">
                    Baladi Engros
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-light)]">
                    Din pålitelige engros-partner
                  </p>
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
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
              </div>

              <div className="space-y-5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group block transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex items-center space-x-4 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-[var(--baladi-accent)]/30 hover:bg-white/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-accent)]/20 to-[var(--baladi-secondary)]/20 transition-all duration-300 group-hover:from-[var(--baladi-accent)]/30 group-hover:to-[var(--baladi-secondary)]/30">
                        <link.icon
                          size={20}
                          className="text-[var(--baladi-accent)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-[family-name:var(--font-dm-sans)] text-base font-semibold text-white transition-colors duration-300 group-hover:text-[var(--baladi-accent)]">
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
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
              </div>

              <div className="space-y-6">
                <div className="group flex items-start space-x-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--baladi-accent)]/30 hover:bg-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-accent)]/20 to-[var(--baladi-secondary)]/20">
                    <Mail size={20} className="text-[var(--baladi-accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-semibold tracking-wider text-white/70 uppercase">
                      E-POST
                    </p>
                    <Link
                      href="mailto:baladi.engros@gmail.com"
                      className="font-[family-name:var(--font-dm-sans)] text-base text-white transition-colors duration-300 hover:text-[var(--baladi-accent)]"
                    >
                      baladi.engros@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--baladi-accent)]/30 hover:bg-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--baladi-accent)]/20 to-[var(--baladi-secondary)]/20">
                    <MapPin size={20} className="text-[var(--baladi-accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-semibold tracking-wider text-white/70 uppercase">
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
                    className="group inline-flex cursor-pointer items-center space-x-3 rounded-xl bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] px-6 py-4 font-semibold text-white shadow-[var(--baladi-accent)]/2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[var(--baladi-accent)]/40 hover:shadow-xl"
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
              © {new Date().getFullYear()} Baladi Engros AS. Alle rettigheter
              forbeholdt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
