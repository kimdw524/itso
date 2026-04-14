'use client';

import { SearchParamsAdapter } from '@kimdw-rtk/react-search-params/next';

import { searchParamsStore } from '@/shared/store';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchParamsAdapter store={searchParamsStore}>
      {children}
    </SearchParamsAdapter>
  );
};
