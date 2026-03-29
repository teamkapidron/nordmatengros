import React from 'react';

interface DataItemProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

function DataItem(props: DataItemProps) {
  const { icon, label, value, valueClassName } = props;

  return (
    <div className="hover:from-[var(--baladi-primary)]/5 hover:to-[var(--baladi-secondary)]/5 group flex items-start gap-4 rounded-lg p-3 transition-all duration-200 hover:bg-gradient-to-r">
      {icon && (
        <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-[var(--baladi-primary)] transition-all duration-200 group-hover:scale-110">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="mb-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]">
          {label}
        </p>
        <div
          className={`font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)] ${valueClassName || ''}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default DataItem;
