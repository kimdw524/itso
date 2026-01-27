import type { ReactNode } from 'react';

import { Box, ScrollArea } from '@kimdw-rtk/ui';

import * as s from './style.css';

interface JobPostingHorizontalListProps {
  children: ReactNode;
}

export const JobPostingHorizontalList = ({
  children,
}: JobPostingHorizontalListProps) => {
  return (
    <ScrollArea>
      <Box flex gap="lg" paddingTop="lg" className={s.container}>
        {children}
      </Box>
    </ScrollArea>
  );
};
