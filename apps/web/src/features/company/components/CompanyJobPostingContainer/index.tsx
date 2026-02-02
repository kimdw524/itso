import { Suspense } from 'react';

import { Box } from '@kimdw-rtk/ui';

import * as s from '@/features/job-posting/components/JobPostingContainer/style.css';
import { JobPostingList } from '@/features/job-posting/components/JobPostingList';
import { JobPostingListLoading } from '@/features/job-posting/components/JobPostingList/loading';
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
