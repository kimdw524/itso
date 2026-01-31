'use client';

import Link from 'next/link';

import {
  Box,
  Card,
  CardContent,
  CardInteraction,
  CardThumbnail,
  Chip,
  Typography,
} from '@kimdw-rtk/ui';

import { OptimisticBookmarkButton } from '@/domains/bookmark/components/OptimisticBookmarkButton';
import type { CompanySummary } from '@/domains/company/models';

import type { JobPostingSummary } from '../../models';
import { formatJobName } from '../../utils/formatJobName';
import { EmploymentTypeChip } from './EmploymentTypeChip';
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
    <Link href={`/post/${jobPosting.id}`} draggable={false}>
      <Card className={s.container} variant="glass">
        <CardInteraction sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* 회사 로고 이미지 */}
          <Box
            flex
            alignItems="center"
            justifyContent="center"
            paddingX="2xl"
            paddingY="3xl"
            style={{
              height: '8em',
            }}
          >
            {company.logo !== '' && (
              <CardThumbnail
                src={company.logo}
                alt="logo"
                style={{
                  maxWidth: '75%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                }}
              />
            )}
            {/* 북마크 버튼 */}
            <OptimisticBookmarkButton
              size="icon-md"
              variant="ghost"
              color="secondary"
              className={s.bookmarkButton}
              bookmarkType="job-posting"
              targetId={jobPosting.id}
              defaultValue={jobPosting.isBookmarked}
              onClick={(e) => e.preventDefault()}
            />
          </Box>
          <CardContent
            sx={{
              paddingX: { desktop: '2xl', mobile: 'xl' },
              paddingY: { desktop: '3xl', mobile: '2xl' },
            }}
          >
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
                  color="secondary-foreground"
                  sx={{ marginBottom: 'md' }}
                >
                  {jobPosting.company.name}
                </Typography>
                {/* 공고 제목 */}
                <Typography
                  fontSize="md"
                  fontWeight="medium"
                  lineHeight="md"
                  style={{ height: '3em', overflow: 'hidden' }}
                >
                  {jobPosting.title}
                </Typography>
                {/* 태그 */}
                <Box
                  flex
                  flexWrap="wrap"
                  gap="md"
                  sx={{ marginY: { desktop: '2xl', mobile: 'lg' } }}
                >
                  <ExperienceRangeChip
                    min={jobPosting.minExperience}
                    max={jobPosting.maxExperience}
                  />
                  <EmploymentTypeChip type={jobPosting.employmentType} />
                  <Chip color="accent">{formatJobName(jobPosting.jobId)}</Chip>
                </Box>
              </Box>
              <JobPostingStatistics jobPosting={jobPosting} />
            </Box>
          </CardContent>
        </CardInteraction>
      </Card>
    </Link>
  );
};
