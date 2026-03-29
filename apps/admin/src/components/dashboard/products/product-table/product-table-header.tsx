import { memo } from 'react';

function ProductTableHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Produkter
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Administrer produktdatabasen din
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductTableHeader);
