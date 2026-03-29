import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

function LogoSection() {
  return (
    <div className="flex items-center">
      <Link href="/" className="group flex items-center space-x-3">
        <div className="relative">
          <Image
            src="/images/brand/logo.png"
            alt="Baladi Engros Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)] transition-colors duration-200 group-hover:text-[var(--baladi-secondary)]">
            Baladi Engros
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
            Din engros-partner
          </p>
        </div>
      </Link>
    </div>
  );
}

export default memo(LogoSection);
