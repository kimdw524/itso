'use client';

import React from 'react';

import type { FetchJobPostingParams } from '@/api/job-posting/fetchJobPosting';
import { useQueryParams } from '@/hooks/useQueryParams';

import { JOB_POSTING } from '../../constants/job-posting';
import { useFetchJobPostingListSuspense } from '../../hooks/api/useJobPostingList';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingListLoading } from './loading';

interface JobPostingListProps {
  queryParams: ReturnType<typeof useQueryParams<FetchJobPostingParams>>;
}

export const JobPostingList = ({ queryParams }: JobPostingListProps) => {
  const { data, trigger, isFetchingNextPage } = useFetchJobPostingListSuspense({
    ...queryParams.rawParams,
    limit: JOB_POSTING.LIST_LIMIT,
  });

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
