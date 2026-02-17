'use client';

import Link from 'next/link';

import {
  Box,
  Card,
  CardContent,
  CardInteraction,
  Chip,
  Typography,
} from '@kimdw-rtk/ui';

import { BookmarkButton } from '@/features/bookmark/components/BookmarkButton';
import { CompanyLogo } from '@/features/company/components/CompanyLogo';
import type { CompanySummary } from '@/features/company/models';

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
    <Link draggable={false} href={`/post/${jobPosting.id}`}>
      <Card className={s.container}>
        <CardInteraction sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* 회사 로고 이미지 */}
          <Box
            alignItems="center"
            justifyContent="center"
            paddingX="2xl"
            paddingY="3xl"
            style={{
              height: '8em',
            }}
            flex
          >
            <CompanyLogo
              alt={company.name}
              logo={company.logo}
              style={{
                maxWidth: '75%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
              }}
            />
            {/* 북마크 버튼 */}
            <BookmarkButton
              bookmarkType="job-posting"
              className={s.bookmarkButton}
              color="secondary"
              isBookmarked={jobPosting.isBookmarked}
              size="icon-md"
              targetId={jobPosting.id}
              variant="ghost"
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
              flexDirection="column"
              justifyContent="space-between"
              sx={{ height: '100%' }}
              flex
            >
              <Box>
                {/* 회사 이름 */}
                <Typography
                  color="secondary-foreground"
                  fontSize="sm"
                  fontWeight="light"
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
                  flexWrap="wrap"
                  gap="md"
                  sx={{ marginY: { desktop: '2xl', mobile: 'lg' } }}
                  flex
                >
                  <ExperienceRangeChip
                    max={jobPosting.maxExperience}
                    min={jobPosting.minExperience}
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
