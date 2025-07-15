import type { ReactNode } from 'react';

import { EyeIcon, StarIcon } from 'lucide-react';

import { Box, Typography } from '@repo/ui';

import type { JobPostingSummary } from '../../types/job-posting';

const Item = ({ icon, value }: { icon: ReactNode; value: ReactNode }) => {
  return (
    <Box flex gap="sm" alignItems="center" sx={{ color: 'secondary-foreground' }}>
      {icon}
      <Typography color="secondary-foreground" fontSize="xs" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  );
};

interface JobPostingStatisticsProps {
  jobPosting: JobPostingSummary;
}

export const JobPostingStatistics = ({ jobPosting }: JobPostingStatisticsProps) => {
  return (
    <Box flex justifyContent="space-between">
      <Item icon={<EyeIcon />} value={<>{jobPosting.views}</>} />
      <Item icon={<StarIcon />} value={<>{jobPosting.views}</>} />
    </Box>
  );
};
