import { QueryClient, isServer } from '@tanstack/react-query';

import { QUERY_CLIENT_CONFIG } from '@/constants/queryClient';

function makeQueryClient() {
  return new QueryClient(QUERY_CLIENT_CONFIG);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
