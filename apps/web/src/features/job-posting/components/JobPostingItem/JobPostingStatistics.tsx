'use client';

import type { ReactNode } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';
import { EyeIcon } from 'lucide-react';

import { getDday } from '@/shared/utils/date';

import type { JobPostingSummary } from '../../models';

const Item = ({ icon, value }: { icon: ReactNode; value: ReactNode }) => {
  return (
    <Box
      alignItems="center"
      gap="sm"
      sx={{ color: 'secondary-foreground' }}
      flex
    >
      {icon}
      <Typography color="secondary-foreground" fontSize="xs" fontWeight="light">
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
    <Box alignItems="center" gap="lg" justifyContent="space-between" flex>
      <Typography fontSize="sm">
        {jobPosting.dueDate === null ? '상시채용' : getDday(jobPosting.dueDate)}
      </Typography>
      {/* 조회수 */}
      <Item
        icon={<EyeIcon height="1em" strokeWidth="1" width="1em" />}
        value={<>{jobPosting.views}</>}
      />
    </Box>
  );
};
