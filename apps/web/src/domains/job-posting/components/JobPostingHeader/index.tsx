'use client';

import { Box, Typography } from '@repo/ui';

import type { JobPosting } from '../../types/job-posting';
import * as s from './style.css';

interface JobPostingHeaderProps {
  jobPosting: JobPosting;
}

export const JobPostingHeader = ({ jobPosting }: JobPostingHeaderProps) => {
  return (
    <Box
      className={s.container}
      sx={{ fontSize: { mobile: 'xs', desktop: 'md' } }}
    >
      <img src={jobPosting.company.logo} alt="logo" className={s.logo} />
      <Typography
        fontSize="2xl"
        fontWeight="semiBold"
        sx={{ marginBottom: 'lg' }}
      >
        {jobPosting.title}
      </Typography>
      <Typography fontSize="lg" color="gray-400">
        {jobPosting.company.name}
      </Typography>
    </Box>
  );
};
