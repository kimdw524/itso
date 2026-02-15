import type { ReactNode } from 'react';

import { Typography } from '@kimdw-rtk/ui';

import * as s from './style.css';

interface SearchResultSectionProps {
  children: ReactNode;
  name: string;
}

export const SearchResultSection = ({
  children,
  name,
}: SearchResultSectionProps) => {
  return (
    <>
      <Typography
        className={s.section}
        color="primary"
        fontSize="xs"
        fontWeight="bold"
        sx={{ padding: 'xl' }}
      >
        {name}
      </Typography>
      {children}
    </>
  );
};
