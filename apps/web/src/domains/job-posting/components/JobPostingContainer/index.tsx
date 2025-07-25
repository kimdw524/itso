'use client';

import { Suspense, useState } from 'react';

import type { FetchJobPostingListParams } from '@/api/job-posting/fetchJobPostingList.client';
import { useQueryParams } from '@/hooks/useQueryParams';

import { EMPLOYMENT_TYPE_KEY, JOB_ID } from '../../constants/job-posting';
import { JobPostingList } from '../JobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import { ShowAllButton } from './ShowAllButton';
import * as s from './style.css';

export const JobPostingContainer = () => {
  const [isShowAll, setShowAll] = useState<boolean>(false);
  const queryParams = useQueryParams<FetchJobPostingListParams>({
    jobIds: JOB_ID,
    employmentTypes: EMPLOYMENT_TYPE_KEY,
  });
  // 필터를 비활성화 했을 때 보여줄 비어있는 필터
  const emptyQueryParams = useQueryParams<FetchJobPostingListParams>();

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <SearchFilter queryParams={queryParams} isDisabled={isShowAll}>
        <ShowAllButton isShowAll={isShowAll} onClick={handleShowAllClick} />
      </SearchFilter>
      <div className={s.container}>
        <Suspense fallback={<JobPostingListLoading />}>
          <JobPostingList
            queryParams={isShowAll ? emptyQueryParams : queryParams}
          />
        </Suspense>
      </div>
    </>
  );
};
