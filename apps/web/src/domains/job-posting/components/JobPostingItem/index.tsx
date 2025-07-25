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
    <Card className={s.container} variant="glass">
      <CardInteraction sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* 회사 로고 이미지 */}
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          paddingX="2xl"
          paddingY="3xl"
          style={{ height: '9rem' }}
        >
          <CardThumbnail
            src={company.logo || ''}
            alt="logo"
            style={{ maxWidth: '75%', maxHeight: '100%' }}
          />
        </Box>
        <CardContent sx={{ paddingX: '2xl', paddingY: '3xl' }}>
          <Box
            flex
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: '100%' }}
          >
            <Box>
              {/* 회사 이름 */}
              <Typography
                fontSize="sm"
                fontWeight="light"
                sx={{ marginBottom: 'lg' }}
              >
                {jobPosting.company.name}
              </Typography>
              {/* 공고 제목 */}
              <Typography
                fontSize="md"
                lineHeight="md"
                style={{ height: '3em', overflow: 'hidden' }}
              >
                {jobPosting.title}
              </Typography>
              {/* 태그 */}
              <Box flex flexWrap="wrap" gap="md" marginY="2xl">
                <ExperienceRangeChip
                  min={jobPosting.minExperience}
                  max={jobPosting.maxExperience}
                />
                <Chip color="blue">
                  {formatEmploymentType(jobPosting.employmentType)}
                </Chip>
                <Chip color="accent">{formatJobName(jobPosting.jobId)}</Chip>
              </Box>
            </Box>
            <JobPostingStatistics jobPosting={jobPosting} />
          </Box>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
