'use client';

import { Suspense } from 'react';

import { Box } from '@repo/ui';

import { useQueryParams } from '@/hooks/useQueryParams';

import type { CompanyFilter } from '../../models';
import { CompanyList } from '../CompanyList';
import { CompanyListLoading } from '../CompanyList/loading';
import * as s from './style.css';

interface CompanyContainerProps {
  filter: CompanyFilter;
}

export const CompanyContainer = ({ filter }: CompanyContainerProps) => {
  const queryParams = useQueryParams<CompanyFilter>(filter);

  return (
    <>
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
