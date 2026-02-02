'use client';

import React from 'react';

import { JOB_POSTING } from '../../constants/job-posting';
import { JobPostingService } from '../../services/JobPostingService';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingListLoading } from '../JobPostingList/loading';

export const BookmarkedJobPostingList = () => {
  const { data, trigger, isFetchingNextPage } =
    JobPostingService.useFetchBookmarkedListSuspense({
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
