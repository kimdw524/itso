'use client';

import { Button } from '@kimdw-rtk/ui';
import { Share2Icon } from 'lucide-react';

import { LogOnClick } from '@/shared/components/LogOnClick';

import type { JobPosting } from '../../models';
import { shareJobPosting } from '../../utils';

interface ShareButtonProps {
  jobPosting: JobPosting;
}

export const ShareButton = ({ jobPosting }: ShareButtonProps) => {
  return (
    <LogOnClick target={jobPosting.id} type="share">
      <Button
        color="secondary"
        size="icon-lg"
        onClick={() => shareJobPosting(jobPosting)}
      >
        <Share2Icon />
      </Button>
    </LogOnClick>
  );
};
