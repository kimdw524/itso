'use client';

import { Suspense } from 'react';

import { Box } from '@repo/ui';

import { StickyHeader } from '@/components/StickyHeader';
import { useQueryParams } from '@/hooks/useQueryParams';

import type { CompanyFilter } from '../../models';
import { CompanyList } from '../CompanyList';
import { CompanyListLoading } from '../CompanyList/loading';
import { SortFilter } from '../SortFilter';
import * as s from './style.css';

interface CompanyContainerProps {
  filter: CompanyFilter;
}

export const CompanyContainer = ({ filter }: CompanyContainerProps) => {
  const queryParams = useQueryParams<CompanyFilter>(filter);

  return (
    <>
      <StickyHeader>
        <Box flex justifyContent="flex-end" width="100%">
          <SortFilter queryParams={queryParams} />
        </Box>
      </StickyHeader>
      <Box
        flex
        flexDirection="column"
        sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
        className={s.container}
      >
        <Suspense fallback={<CompanyListLoading />}>
          <CompanyList params={queryParams.rawParams} />
        </Suspense>
      </Box>
    </>
  );
};
