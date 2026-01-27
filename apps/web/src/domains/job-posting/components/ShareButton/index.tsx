'use client';

import { Button } from '@kimdw-rtk/ui';
import { Share2Icon } from 'lucide-react';

import { LogOnClick } from '@/components/LogOnClick';

import type { JobPosting } from '../../models';
import { shareJobPosting } from '../../utils';

interface ShareButtonProps {
  jobPosting: JobPosting;
}

export const ShareButton = ({ jobPosting }: ShareButtonProps) => {
  return (
    <LogOnClick type="share" target={jobPosting.id}>
      <Button
        size="icon-lg"
        color="secondary"
        onClick={() => shareJobPosting(jobPosting)}
      >
        <Share2Icon />
      </Button>
    </LogOnClick>
  );
};
