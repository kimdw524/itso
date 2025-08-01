import type { QueryClientConfig } from '@tanstack/react-query';

export const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
} satisfies QueryClientConfig;
