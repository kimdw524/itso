import type { ReactNode } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';

interface InfoProps {
  children: ReactNode;
  text?: string;
  icon?: ReactNode;
}

export const Info = ({ children, icon, text }: InfoProps) => {
  return (
    <Box alignItems="center" gap="sm" flex>
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
