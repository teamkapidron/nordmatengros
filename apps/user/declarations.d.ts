import React from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '@/utils/types.util';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        behavior?: 'scroll' | 'slide' | 'alternate';
        direction?: 'left' | 'right' | 'up' | 'down';
        scrollamount?: string | number;
        scrolldelay?: string | number;
        loop?: string | number;
        width?: string | number;
        height?: string | number;
      };
    }
  }
}
