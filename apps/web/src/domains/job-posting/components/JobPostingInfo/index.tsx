import type React from 'react';

import { Share2Icon, StarIcon } from 'lucide-react';

import { Box, Button, Card, CardContent } from '@repo/ui';

import { JOB_POSTING } from '../../constants/job-posting';
import type { JobPosting } from '../../types/job-posting';
import { formatEmploymentType, formatExperienceRange } from '../../utils';
import { InfoItem } from './InfoItem';

interface JobPostingInfoProps extends React.ComponentProps<typeof Card> {
  jobPosting: JobPosting;
}

export const JobPostingInfo = ({
  jobPosting,
  sx,
  ...rest
}: JobPostingInfoProps) => {
  return (
    <Card
      sx={{
        width: { mobile: '100%', desktop: '20em' },
        fontSize: { mobile: 'sm', desktop: 'md' },
        ...sx,
      }}
      {...rest}
    >
      <CardContent sx={{ padding: 'xl', width: '100%' }}>
        <Box flex flexDirection="column" gap="2xl">
          <InfoItem
            name="경력사항"
            value={formatExperienceRange(
              jobPosting.minExperience,
              jobPosting.maxExperience,
            )}
          />
          <InfoItem
            name="고용형태"
            value={formatEmploymentType(jobPosting.employmentType)}
          />
          <InfoItem
            name="직군 / 직무"
            value={JOB_POSTING.JOB_NAME[jobPosting.jobId]}
          />
          <InfoItem
            name="시작일"
            value={new Date(jobPosting.openDate).toLocaleString()}
          />
          <InfoItem
            name="마감일"
            value={
              jobPosting.dueDate === null
                ? '상시채용'
                : new Date(jobPosting.dueDate).toLocaleString()
            }
          />
          <Box flex alignItems="center" gap="lg" flexShrink="0" marginTop="lg">
            <Button size="icon-lg" color="secondary">
              <StarIcon />
            </Button>
            <Button size="icon-lg" color="secondary">
              <Share2Icon />
            </Button>
            <Button size="lg" sx={{ flexGrow: '1' }}>
              지원하기
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
