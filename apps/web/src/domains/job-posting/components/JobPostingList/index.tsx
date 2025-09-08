'use client';

import React from 'react';

import { useQueryParams } from '@/hooks/useQueryParams';
import type { RequestType } from '@/utils/http';

import { JobPostingService } from '../../services/JobPostingService';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingListLoading } from './loading';

interface JobPostingListProps {
  queryParams: ReturnType<
    typeof useQueryParams<
      RequestType<typeof JobPostingService.getJobPostingList>
    >
  >;
}

export const JobPostingList = ({ queryParams }: JobPostingListProps) => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchListSuspense(queryParams.rawParams);

  return (
    <>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((jobPosting) => (
            <JobPostingItem
              key={jobPosting.id}
              jobPosting={jobPosting}
              company={jobPosting.company}
            />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <JobPostingListLoading />}
      {trigger}
    </>
  );
};
