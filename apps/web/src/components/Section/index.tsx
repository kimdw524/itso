import type { ReactNode } from 'react';

import { Typography } from '@repo/ui';

interface SectionProps {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export const Section = ({ children, title, description }: SectionProps) => {
  return (
    <section>
      <Typography fontSize="2xl" fontWeight="semiBold" lineHeight="md">
        {title}
      </Typography>
      {description !== undefined && (
        <Typography sx={{ marginY: 'lg' }}>{description}</Typography>
      )}
      <div>{children}</div>
    </section>
  );
};
