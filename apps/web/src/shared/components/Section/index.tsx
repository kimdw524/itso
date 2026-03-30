import type { ReactNode } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';

interface SectionProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export const Section = ({ children, title, description }: SectionProps) => {
  return (
    <section>
      <Box paddingX="xl">
        {title !== undefined && (
          <Typography
            fontSize="xl"
            fontWeight="semiBold"
            lineHeight="md"
            sx={description === undefined ? { marginY: 'lg' } : undefined}
          >
            {title}
          </Typography>
        )}
        {description !== undefined && (
          <Typography sx={{ marginY: 'lg' }}>{description}</Typography>
        )}
      </Box>
      <div>{children}</div>
    </section>
  );
};
