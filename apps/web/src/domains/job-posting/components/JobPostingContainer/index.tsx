'use client';

import { Suspense } from 'react';

import type { FetchJobPostingParams } from '@/api/job-posting/fetchJobPosting';
import { useQueryParams } from '@/hooks/useQueryParams';

import { EMPLOYMENT_TYPE_KEY, JOB_ID } from '../../constants/job-posting';
import { JobPostingList } from '../JobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import * as s from './style.css';

export const JobPostingContainer = () => {
  const queryParams = useQueryParams<FetchJobPostingParams>({
    jobIds: JOB_ID,
    employmentTypes: EMPLOYMENT_TYPE_KEY,
  });

  return (
    <>
      <SearchFilter queryParams={queryParams} />
      <div className={s.container}>
        <Suspense fallback={<JobPostingListLoading />}>
          <JobPostingList queryParams={queryParams} />
        </Suspense>
      </div>
    </>
  );
};
