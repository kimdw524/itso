'use client';

import { motion } from 'motion/react';

import { Box, Button, Typography } from '@repo/ui';

import type { JobPosting } from '../../types/job-posting';
import * as s from './style.css';

interface JobPostingHeaderSimpleProps {
  jobPosting: JobPosting;
}

export const JobPostingHeaderSimple = ({
  jobPosting,
}: JobPostingHeaderSimpleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: '100%' }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: '100%' }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={s.wrapper}
    >
      <Box
        className={s.container}
        sx={{
          paddingX: 'lg',
          paddingY: { desktop: '2xl', mobile: 'lg' },
          fontSize: { desktop: 'md', mobile: 'sm' },
        }}
      >
        <Box
          flex
          gap="md"
          sx={{
            alignItems: 'flex-start',
            flexDirection: { desktop: 'row', mobile: 'column' },
            flexGrow: '1',
          }}
        >
          <img src={jobPosting.company.logo} alt="logo" className={s.logo} />
          <Typography fontSize="md" fontWeight="medium" lineHeight="sm">
            {jobPosting.title}
          </Typography>
        </Box>
        <Button sx={{ flexShrink: '0' }}>지원하기</Button>
      </Box>
    </motion.div>
  );
};
