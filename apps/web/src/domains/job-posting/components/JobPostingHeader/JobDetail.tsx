import { Box } from '@repo/ui';

import { Separator } from '@/components/Separator';

import type { JobPosting } from '../../types/job-posting';
import { formatEmploymentType, formatExperienceRange } from '../../utils';
import { InfoItem } from './InfoItem';
import * as s from './style.css';

interface JobDetailProps {
  jobPosting: JobPosting;
}

export const JobDetail = ({ jobPosting }: JobDetailProps) => {
  return (
    <Box flex gap="lg" flexWrap="wrap">
      <Separator separator={<span className={s.separator} />}>
        <InfoItem>
          {formatExperienceRange(
            jobPosting.minExperience,
            jobPosting.maxExperience,
          )}
        </InfoItem>
        <InfoItem>{formatEmploymentType(jobPosting.employmentType)}</InfoItem>
        <InfoItem>
          {jobPosting.dueDate === null
            ? '상시채용'
            : `${new Date(jobPosting.dueDate).toLocaleString()} 마감`}
        </InfoItem>
      </Separator>
    </Box>
  );
};
