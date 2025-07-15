'use client';

import React from 'react';

import { JOB_POSTING } from '../../constants/job-posting';
import { useFetchJobPostingListSuspense } from '../../hooks/api/useJobPostingList';
import { JobPostingItem } from '../JobPostingItem';
import * as s from './style.css';

export const JobPostingList = () => {
  const { data, isFetchingNextPage, trigger } = useFetchJobPostingListSuspense({
    limit: JOB_POSTING.LIST_LIMIT,
  });

  return (
    <>
      <div className={s.container}>
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((jobPosting) => (
              <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} company={jobPosting.company} />
            ))}
          </React.Fragment>
        ))}
        {trigger}
      </div>
      {isFetchingNextPage && <p>다음 데이터를 불러오고 있습니다.</p>}
    </>
  );
};
