'use client';

import type { ComponentProps } from 'react';

import { Button } from '@kimdw-rtk/ui';

import { LogOnClick } from '@/shared/components';

import type { JobPosting } from '../../models';
import { applyJob } from '../../utils';

interface ApplyButtonProps
  extends Omit<ComponentProps<typeof Button>, 'children'> {
  jobPosting: JobPosting;
}

export const ApplyButton = ({ jobPosting, ...rest }: ApplyButtonProps) => {
  return (
    <LogOnClick target={jobPosting.id} type="apply">
      <Button {...rest} onClick={() => applyJob(jobPosting)}>
        지원하기
      </Button>
    </LogOnClick>
  );
};
