import { Box, Card, CardContent, CardInteraction, CardThumbnail, Typography } from '@repo/ui';

import type { CompanySummary } from '@/domains/company/types/company';

import type { JobPostingSummary } from '../../types/job-posting';
import { formatExperienceRange, formatEmploymentType } from '../../utils';
import { formatJobName } from '../../utils/formatJobName';

interface JobPostingItemProps {
  jobPosting: JobPostingSummary;
  company: CompanySummary;
}

export const JobPostingItem = ({ jobPosting, company }: JobPostingItemProps) => {
  return (
    <Card sx={{ backgroundColor: 'background' }}>
      <CardInteraction>
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          padding="xl"
          style={{ height: '7rem', backgroundColor: '#fff' }}
        >
          <CardThumbnail src={company.logo || ''} alt="logo" style={{ maxWidth: '75%', maxHeight: '100%' }} />
        </Box>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 'xl' }} style={{ height: '7.5rem' }}>
          <Typography fontSize="sm" sx={{ marginBottom: 'sm' }}>
            {jobPosting.company.name}
          </Typography>
          <Box flex flexDirection="column" justifyContent={'space-between'} flexGrow="1">
            <Typography fontSize="md" fontWeight="medium" lineHeight="sm" style={{ wordBreak: 'break-all' }}>
              {jobPosting.title}
            </Typography>
            <Typography fontSize="sm">
              {formatExperienceRange(jobPosting.minExperience, jobPosting.maxExperience)} ·{' '}
              {formatEmploymentType(jobPosting.employmentType)} · {formatJobName(jobPosting.jobId)}
            </Typography>
          </Box>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
