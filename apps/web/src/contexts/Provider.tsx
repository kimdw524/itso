'use client';

import { type ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import { UIProvider } from '@repo/ui';

import { getQueryClient } from '@/utils/getQueryClient';

import { ThemeProvider } from './ThemeProvider';

export const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        <UIProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </UIProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
};
