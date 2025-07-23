import {
  Box,
  Card,
  CardContent,
  CardInteraction,
  CardThumbnail,
  Chip,
  Typography,
} from '@repo/ui';

import type { CompanySummary } from '@/domains/company/types/company';

import type { JobPostingSummary } from '../../types/job-posting';
import { formatEmploymentType } from '../../utils';
import { formatJobName } from '../../utils/formatJobName';
import { ExperienceRangeChip } from './ExperienceRangeChip';
import { JobPostingStatistics } from './JobPostingStatistics';
import * as s from './style.css';

interface JobPostingItemProps {
  jobPosting: JobPostingSummary;
  company: CompanySummary;
}

export const JobPostingItem = ({
  jobPosting,
  company,
}: JobPostingItemProps) => {
  return (
    <Card className={s.container} sx={{ backgroundColor: 'background' }}>
      <CardInteraction>
        {/* 회사 로고 이미지 */}
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          padding="xl"
          style={{ height: '7rem', backgroundColor: '#fff' }}
        >
          <CardThumbnail
            src={company.logo || ''}
            alt="logo"
            style={{ maxWidth: '75%', maxHeight: '100%' }}
          />
        </Box>
        <CardContent sx={{ padding: 'xl' }}>
          {/* 회사 이름 */}
          <Typography fontSize="sm" sx={{ marginBottom: 'md' }}>
            {jobPosting.company.name}
          </Typography>
          {/* 공고 제목 */}
          <Typography
            fontSize="md"
            fontWeight="medium"
            lineHeight="sm"
            style={{ height: '2.5em', overflow: 'hidden' }}
          >
            {jobPosting.title}
          </Typography>
          {/* 태그 */}
          <Box flex flexWrap="wrap" gap="md" marginY="lg">
            <ExperienceRangeChip
              min={jobPosting.minExperience}
              max={jobPosting.maxExperience}
            />
            <Chip color="blue">
              {formatEmploymentType(jobPosting.employmentType)}
            </Chip>
            <Chip color="zinc">{formatJobName(jobPosting.jobId)}</Chip>
          </Box>
          <JobPostingStatistics jobPosting={jobPosting} />
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
