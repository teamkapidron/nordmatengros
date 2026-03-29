'use client';

import React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Minus, Plus } from 'lucide-react';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  (
    {
      value,
      onChange,
      min = 1,
      max = 99,
      disabled = false,
      className,
      size = 'default',
    },
    ref,
  ) => {
    const handleDecrement = () => {
      if (value > min && !disabled) {
        onChange(value - 1);
      }
    };

    const handleIncrement = () => {
      if (value < max && !disabled) {
        onChange(value + 1);
      }
    };

    const sizeClasses = {
      sm: {
        container: 'h-8',
        button: 'w-8',
        value: 'w-12 text-sm',
        icon: 14,
      },
      default: {
        container: 'h-10',
        button: 'w-10',
        value: 'w-14 text-base',
        icon: 16,
      },
      lg: {
        container: 'h-12',
        button: 'w-12',
        value: 'w-16 text-lg',
        icon: 18,
      },
    };

    const { container, button, value: valueWidth, icon } = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center overflow-hidden rounded-lg border border-[var(--baladi-border)] bg-white shadow-sm transition-all duration-200',
          'focus-within:ring-[var(--baladi-primary)]/20 focus-within:border-[var(--baladi-primary)] focus-within:ring-2',
          container,
          disabled && 'cursor-not-allowed opacity-60',
          className,
        )}
      >
        {/* Decorative gradient line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--baladi-primary)] via-[var(--baladi-secondary)] to-[var(--baladi-primary)] opacity-30" />

        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min || disabled}
          className={cn(
            'group relative flex h-full cursor-pointer items-center justify-center border-r border-[var(--baladi-border)] bg-gradient-to-b from-[var(--baladi-muted)] to-white transition-all duration-200',
            'hover:from-[var(--baladi-primary)]/10 hover:to-[var(--baladi-primary)]/5 hover:border-[var(--baladi-primary)]/30',
            'active:from-[var(--baladi-primary)]/20 active:to-[var(--baladi-primary)]/10 active:scale-95',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-[var(--baladi-muted)] disabled:hover:to-white',
            'focus:ring-[var(--baladi-primary)]/20 focus:outline-none focus:ring-2 focus:ring-offset-1',
            button,
          )}
          aria-label="Decrease quantity"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 transition-all duration-200 group-hover:bg-white group-hover:shadow-sm group-active:scale-90">
            <Minus
              size={icon}
              className="group-disabled:text-[var(--baladi-gray)]/50 text-[var(--baladi-gray)] transition-colors duration-200 group-hover:text-[var(--baladi-primary)]"
            />
          </div>
        </button>

        <div
          className={cn(
            'to-[var(--baladi-muted)]/30 flex h-full items-center justify-center bg-gradient-to-b from-white font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]',
            valueWidth,
          )}
        >
          <span className="relative">
            {value}
            <div className="bg-[var(--baladi-primary)]/5 absolute inset-0 rounded opacity-0 transition-opacity duration-200" />
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max || disabled}
          className={cn(
            'group relative flex h-full cursor-pointer items-center justify-center border-l border-[var(--baladi-border)] bg-gradient-to-b from-[var(--baladi-muted)] to-white transition-all duration-200',
            'hover:from-[var(--baladi-primary)]/10 hover:to-[var(--baladi-primary)]/5 hover:border-[var(--baladi-primary)]/30',
            'active:from-[var(--baladi-primary)]/20 active:to-[var(--baladi-primary)]/10 active:scale-95',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-[var(--baladi-muted)] disabled:hover:to-white',
            'focus:ring-[var(--baladi-primary)]/20 focus:outline-none focus:ring-2 focus:ring-offset-1',
            button,
          )}
          aria-label="Increase quantity"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 transition-all duration-200 group-hover:bg-white group-hover:shadow-sm group-active:scale-90">
            <Plus
              size={icon}
              className="group-disabled:text-[var(--baladi-gray)]/50 text-[var(--baladi-gray)] transition-colors duration-200 group-hover:text-[var(--baladi-primary)]"
            />
          </div>
        </button>
      </div>
    );
  },
);

QuantityInput.displayName = 'QuantityInput';

export { QuantityInput };
