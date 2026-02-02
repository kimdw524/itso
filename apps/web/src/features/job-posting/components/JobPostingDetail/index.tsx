import { Box } from '@kimdw-rtk/ui';

import type { JobPosting } from '../../models';
import { JobPostingActions } from './JobPostingDetail';
import { JobPostingDetailBody } from './JobPostingDetailBody';
import { JobPostingDetailHeader } from './JobPostingDetailHeader';

interface JobPostingDetailProps {
  jobPosting: JobPosting;
  description: string;
}

export const JobPostingDetail = ({
  jobPosting,
  description,
}: JobPostingDetailProps) => {
  return (
    <>
      <JobPostingDetailHeader jobPosting={jobPosting}>
        <JobPostingActions jobPosting={jobPosting} />
      </JobPostingDetailHeader>
      <Box padding="lg">
        <JobPostingDetailBody>{description}</JobPostingDetailBody>
      </Box>
    </>
  );
};
