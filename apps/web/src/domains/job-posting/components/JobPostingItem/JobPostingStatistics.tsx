import type { ReactNode } from 'react';

import { EyeIcon, StarIcon } from 'lucide-react';

import { Box, Typography } from '@repo/ui';

import { formatTime, getDday } from '@/utils/date';

import type { JobPostingSummary } from '../../types/job-posting';

const Item = ({ icon, value }: { icon: ReactNode; value: ReactNode }) => {
  return (
    <Box
      flex
      gap="sm"
      alignItems="center"
      sx={{ color: 'secondary-foreground' }}
    >
      {icon}
      <Typography
        color="secondary-foreground"
        fontSize="xs"
        fontWeight="medium"
      >
        {value}
      </Typography>
    </Box>
  );
};

interface JobPostingStatisticsProps {
  jobPosting: JobPostingSummary;
}

export const JobPostingStatistics = ({
  jobPosting,
}: JobPostingStatisticsProps) => {
  return (
    <Box flex alignItems="center" justifyContent="space-between" gap="lg">
      <Typography fontSize="sm">
        {jobPosting.dueDate === null
          ? '상시채용'
          : `~ ${formatTime(jobPosting.dueDate)} (${getDday(jobPosting.dueDate)})`}
      </Typography>
      <Box flex gap="lg">
        <Item icon={<EyeIcon />} value={<>{jobPosting.views}</>} />
        <Item icon={<StarIcon />} value={<>{jobPosting.views}</>} />
      </Box>
    </Box>
  );
};
