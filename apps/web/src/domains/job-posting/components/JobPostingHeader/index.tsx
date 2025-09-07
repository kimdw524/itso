'use client';

import { useRef, type ReactNode } from 'react';

import { AnimatePresence } from 'motion/react';

import { Box, Typography } from '@repo/ui';
import { useIsInViewport } from '@repo/utils';

import type { JobPosting } from '../../models';
import { JobPostingHeaderSimple } from '../JobPostingHeaderSimple';
import { JobDetail } from './JobDetail';
import * as s from './style.css';

interface JobPostingHeaderProps {
  children: ReactNode;
  jobPosting: JobPosting;
}

export const JobPostingHeader = ({
  children,
  jobPosting,
}: JobPostingHeaderProps) => {
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
          <img src={jobPosting.company.logo} alt="logo" className={s.logo} />
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
        {!isInViewport && <JobPostingHeaderSimple jobPosting={jobPosting} />}
      </AnimatePresence>
    </>
  );
};
