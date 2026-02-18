'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import { getQueryClient } from '@/shared/utils';

import { ThemeProvider } from './ThemeProvider';

export const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  const portalContainer = useSyncExternalStore(
    () => () => {},
    () => document.getElementById('portal') ?? undefined,
    () => undefined,
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        <UIProvider container={portalContainer}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </UIProvider>
        <div id="portal" />
      </JotaiProvider>
    </ThemeProvider>
  );
};
