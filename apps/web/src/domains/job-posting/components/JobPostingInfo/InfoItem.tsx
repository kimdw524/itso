import type { ReactNode } from 'react';

import { Typography } from '@repo/ui';

interface InfoItemProps {
  name: string;
  value: ReactNode;
}

export const InfoItem = ({ name, value }: InfoItemProps) => {
  return (
    <div>
      <Typography color="gray-400" sx={{ marginBottom: 'md' }}>
        {name}
      </Typography>
      <Typography fontWeight="light">{value}</Typography>
    </div>
  );
};
