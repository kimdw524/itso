import type { ReactNode } from 'react';

import { Box, Typography } from '@repo/ui';

interface InfoProps {
  children: ReactNode;
  text?: string;
  icon?: ReactNode;
}

export const Info = ({ children, icon, text }: InfoProps) => {
  return (
    <Box flex alignItems="center" gap="sm">
      {icon ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        <>
          <span>{text}</span>
          <Typography fontWeight="medium">{children}</Typography>
        </>
      )}
    </Box>
  );
};
