import type { ReactNode } from 'react';

import { Typography } from '@kimdw-rtk/ui';

interface SectionProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export const Section = ({ children, title, description }: SectionProps) => {
  return (
    <section>
      {title !== undefined && (
        <Typography fontSize="2xl" fontWeight="semiBold" lineHeight="md">
          {title}
        </Typography>
      )}
      {description !== undefined && (
        <Typography sx={{ marginY: 'lg' }}>{description}</Typography>
      )}
      <div>{children}</div>
    </section>
  );
};
