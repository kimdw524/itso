'use client';

import React from 'react';

import { useSuspenseScrollQuery } from '@/shared/hooks';

import type { CompanyFilter } from '../../models';
import { CompanyService } from '../../services';
import { CompanyItem } from '../CompanyItem';
import { CompanyListLoading } from './loading';

interface CompanyListProps {
  params: CompanyFilter;
}

export const CompanyList = ({ params }: CompanyListProps) => {
  const { data, trigger, isFetchingNextPage } =
    useSuspenseScrollQuery(CompanyService.queries.getCompanyList(params));

  return (
    <>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <CompanyListLoading />}
      {trigger}
    </>
  );
};
