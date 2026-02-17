import { Box, Typography } from '@kimdw-rtk/ui';
import { motion } from 'motion/react';

import { CompanyLogo } from '@/features/company/components/CompanyLogo';
import type { JobPosting } from '@/features/job-posting/models';

import { ApplyButton } from '../../ApplyButton';
import * as s from './style.css';

interface JobPostingDetailFooterProps {
  jobPosting: JobPosting;
}

export const JobPostingDetailFooter = ({
  jobPosting,
}: JobPostingDetailFooterProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className={s.wrapper}
      exit={{ opacity: 0, translateY: '100%' }}
      initial={{ opacity: 0, translateY: '100%' }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
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
          gap="md"
          sx={{
            alignItems: 'flex-start',
            flexDirection: { desktop: 'row', mobile: 'column' },
            flexGrow: '1',
          }}
          flex
        >
          <CompanyLogo
            alt={jobPosting.company.name}
            className={s.logo}
            logo={jobPosting.company.logo}
          />
          <Typography fontSize="md" fontWeight="medium" lineHeight="sm">
            {jobPosting.title}
          </Typography>
        </Box>
        <ApplyButton jobPosting={jobPosting} sx={{ flexShrink: '0' }} />
      </Box>
    </motion.div>
  );
};
