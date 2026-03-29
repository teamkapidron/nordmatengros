import * as React from 'react';

import { cn } from '@repo/ui/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

function Input({ className, type, iconLeft, iconRight, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {iconLeft && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">
          {iconLeft}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          iconLeft && 'pl-10',
          iconRight && 'pr-10',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {iconRight && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400">
          {iconRight}
        </div>
      )}
      <div className="input-underline" />
    </div>
  );
}

export { Input };
