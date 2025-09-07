'use client';

import type { ComponentProps } from 'react';

import { Button } from '@repo/ui';

import { LogOnClick } from '@/components/LogOnClick';

import type { JobPosting } from '../../models';
import { applyJob } from '../../utils';

interface ApplyButtonProps
  extends Omit<ComponentProps<typeof Button>, 'children'> {
  jobPosting: JobPosting;
}

export const ApplyButton = ({ jobPosting, ...rest }: ApplyButtonProps) => {
  return (
    <LogOnClick type="apply" target={jobPosting.id}>
      <Button {...rest} onClick={() => applyJob(jobPosting)}>
        지원하기
      </Button>
    </LogOnClick>
  );
};
