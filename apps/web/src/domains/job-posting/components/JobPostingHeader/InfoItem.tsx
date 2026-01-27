import type { ReactNode } from 'react';

import { Typography } from '@kimdw-rtk/ui';

interface InfoItemProps {
  children: ReactNode;
}

export const InfoItem = ({ children }: InfoItemProps) => {
  return <Typography color="secondary-foreground">{children}</Typography>;
};
