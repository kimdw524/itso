'use client';

import { Suspense, useSyncExternalStore, type ReactNode } from 'react';

import { SearchParamsAdapter } from '@kimdw-rtk/react-search-params/next';
import { UIProvider } from '@kimdw-rtk/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

import { getQueryClient } from '@/shared/utils';

import { searchParamsStore } from '../store';
import { ThemeProvider } from './ThemeProvider';

const emptyStore = () => () => {};

export const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  const portalContainer = useSyncExternalStore(
    emptyStore,
    () => document.getElementById('portal') ?? undefined,
    () => undefined,
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        <Suspense fallback={null}>
          <SearchParamsAdapter store={searchParamsStore}>
            <UIProvider container={portalContainer}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </UIProvider>
          </SearchParamsAdapter>
          <div id="portal" />
        </Suspense>
      </JotaiProvider>
    </ThemeProvider>
  );
};
