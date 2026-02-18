import { Suspense } from 'react';

import { Box } from '@kimdw-rtk/ui';

import {
  JobPostingList,
  JobPostingListLoading,
} from '@/features/job-posting/components';
import * as s from '@/features/job-posting/components/JobPostingContainer/style.css';
import type { JobPostingSearchFilter } from '@/features/job-posting/models';

interface CompanyJobPostingContainerProps {
  filter: JobPostingSearchFilter;
}

export const CompanyJobPostingContainer = ({
  filter,
}: CompanyJobPostingContainerProps) => {
  return (
    <Box
      className={s.container}
      sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
    >
      <Suspense fallback={<JobPostingListLoading />}>
        <JobPostingList params={filter} />
      </Suspense>
    </Box>
  );
};
