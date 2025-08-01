'use client';

import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import { UIProvider } from '@repo/ui';

import { QUERY_CLIENT_CONFIG } from '@/constants/queryClient';

import { ThemeProvider } from './ThemeProvider';

const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

export const Provider = ({ children }: { children: ReactNode }) => {
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
