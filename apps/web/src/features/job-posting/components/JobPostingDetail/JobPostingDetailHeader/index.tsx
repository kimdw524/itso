'use client';

import { useRef, type ReactNode } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';
import { useIsInViewport } from '@kimdw-rtk/utils';
import { AnimatePresence } from 'motion/react';

import { CompanyLogo } from '@/features/company/components/CompanyLogo';

import type { JobPosting } from '../../../models';
import { JobPostingDetailFooter } from '../JobPostingDetailFooter';
import { JobDetail } from './JobDetail';
import * as s from './style.css';

interface JobPostingDetailHeaderProps {
  children: ReactNode;
  jobPosting: JobPosting;
}

export const JobPostingDetailHeader = ({
  children,
  jobPosting,
}: JobPostingDetailHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInViewport } = useIsInViewport(ref);

  return (
    <>
      <Box
        className={s.container}
        ref={ref}
        sx={{
          flexDirection: { desktop: 'row', mobile: 'column' },
          alignItems: { desktop: 'center', mobile: 'flex-start' },
          fontSize: { desktop: 'md', mobile: 'sm' },
        }}
      >
        <div>
          <CompanyLogo
            logo={jobPosting.company.logo}
            alt={jobPosting.company.name}
            className={s.logo}
          />
          <Typography fontSize="2xl" fontWeight="semiBold" lineHeight="sm">
            {jobPosting.title}
          </Typography>
          <Typography
            fontSize="md"
            sx={{ marginTop: 'md', marginBottom: '2xl' }}
          >
            {jobPosting.company.name}
          </Typography>
          {/* 경력, 고용형태, 마감일 등을 보여주는 컴포넌트 */}
          <JobDetail jobPosting={jobPosting} />
        </div>
        <Box sx={{ width: { desktop: 'auto', mobile: '100%' } }}>
          {children}
        </Box>
      </Box>
      <AnimatePresence>
        {!isInViewport && <JobPostingDetailFooter jobPosting={jobPosting} />}
      </AnimatePresence>
    </>
  );
};
