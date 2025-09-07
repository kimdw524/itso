'use client';

import { Suspense, useState } from 'react';

import { Box } from '@repo/ui';

import { useQueryParams } from '@/hooks/useQueryParams';
import type { RequestType } from '@/utils/http';

import { EMPLOYMENT_TYPE_KEY, JOB_ID } from '../../constants/job-posting';
import type { JobPostingService } from '../../services/JobPostingService';
import { JobPostingList } from '../JobPostingList';
import { JobPostingListLoading } from '../JobPostingList/loading';
import { SearchFilter } from '../SearchFilter';
import { ShowAllButton } from './ShowAllButton';
import * as s from './style.css';

export const JobPostingContainer = () => {
  const [isShowAll, setShowAll] = useState<boolean>(false);
  const queryParams = useQueryParams<
    RequestType<typeof JobPostingService.getJobPostingList>
  >({
    jobIds: JOB_ID,
    employmentTypes: EMPLOYMENT_TYPE_KEY,
    orderBy: 'createdAt',
  });
  // 필터를 비활성화 했을 때 보여줄 비어있는 필터
  const emptyQueryParams =
    useQueryParams<RequestType<typeof JobPostingService.getJobPostingList>>();

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <SearchFilter queryParams={queryParams} isDisabled={isShowAll}>
        <ShowAllButton isShowAll={isShowAll} onClick={handleShowAllClick} />
      </SearchFilter>
      <Box
        className={s.container}
        sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
      >
        <Suspense fallback={<JobPostingListLoading />}>
          <JobPostingList
            queryParams={isShowAll ? emptyQueryParams : queryParams}
          />
        </Suspense>
      </Box>
    </>
  );
};
