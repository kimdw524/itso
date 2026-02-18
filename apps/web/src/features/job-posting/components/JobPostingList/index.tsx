'use client';

import React from 'react';

import type { JobPostingSearchFilter } from '../../models';
import { JobPostingService } from '../../services';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingListLoading } from './loading';

interface JobPostingListProps {
  params: JobPostingSearchFilter;
}

export const JobPostingList = ({ params }: JobPostingListProps) => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchListSuspense(params);

  return (
    <>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((jobPosting) => (
            <JobPostingItem
              key={jobPosting.id}
              company={jobPosting.company}
              jobPosting={jobPosting}
            />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <JobPostingListLoading />}
      {trigger}
    </>
  );
};

export * from './loading';
