import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

function LogoSection() {
  return (
    <div className="flex items-center">
      <Link href="/" className="group flex items-center space-x-3">
        <div className="relative">
          <Image
            src="/images/brand/icon.png"
            alt="Nordmat Engros Logo"
            width={48}
            height={48}
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      </Link>
    </div>
  );
}

export default memo(LogoSection);
