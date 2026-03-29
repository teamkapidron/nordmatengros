import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@repo/ui/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border-[var(--color-primary)] text-[var(--color-primary)] hover:border-transparent border border-[var(--color-primary)]/20 shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-green-600 text-white shadow-xs hover:bg-green-700',
        underline:
          'text-[var(--color-primary)] font-medium p-0 h-auto relative hover-underline',
        danger: 'bg-red-600 text-white shadow-xs hover:bg-red-700',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  // If it's an icon-only button, just render the icon
  const isIconOnly = size === 'icon';

  // Prepare button content based on loading state and icons
  const renderContent = () => {
    if (isLoading) {
      return [
        <Loader2 key="loader" className="mr-2 h-4 w-4 animate-spin" />,
        children,
      ];
    }

    // Not loading state
    const content = [];

    if (iconLeft && !isIconOnly) {
      content.push(
        <span key="icon-left" className="mr-2 h-4 w-4 flex-shrink-0">
          {iconLeft}
        </span>,
      );
    }

    if (isIconOnly && (iconLeft || iconRight)) {
      content.push(
        <span key="icon-only" className="flex-shrink-0">
          {iconLeft || iconRight}
        </span>,
      );
    } else {
      content.push(children);
    }

    if (iconRight && !isIconOnly) {
      content.push(
        <span key="icon-right" className="ml-2 h-4 w-4 flex-shrink-0">
          {iconRight}
        </span>,
      );
    }

    return content;
  };

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        isIconOnly && !iconLeft && !iconRight && 'p-0',
        'cursor-pointer rounded-md',
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </Comp>
  );
}

export { Button, buttonVariants };
