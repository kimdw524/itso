'use client';

import React from 'react';

import type { JobPostingSearchFilter } from '../../models';
import { JobPostingService } from '../../services/JobPostingService';
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
