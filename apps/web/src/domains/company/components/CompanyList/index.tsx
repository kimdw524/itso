'use client';

import React from 'react';

import type { CompanyFilter } from '../../models';
import { CompanyService } from '../../services/CompanyService';
import { CompanyItem } from '../CompanyItem';
import { CompanyListLoading } from './loading';

interface CompanyListProps {
  params: CompanyFilter;
}

export const CompanyList = ({ params }: CompanyListProps) => {
  const { data, trigger, isFetchingNextPage } =
    CompanyService.useFetchListSuspense(params);

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
