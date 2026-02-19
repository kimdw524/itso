'use client';

import { useRef, type ReactNode } from 'react';

import { Box } from '@kimdw-rtk/ui';

import { useSticky } from '@/shared/hooks/useSticky';

import * as s from './style.css';

interface StickyHeaderProps {
  children?: ReactNode;
}

export const StickyHeader = ({ children }: StickyHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isStuck } = useSticky(ref);

  return (
    <Box
      ref={ref}
      className={s.container({ isStuck })}
      flexDirection="column"
      gap="lg"
      sx={{
        fontSize: { desktop: 'md', mobile: 'sm' },
      }}
      flex
    >
      {children}
    </Box>
  );
};
