import type { ReactNode } from 'react';

import { Button, Flex } from '@kimdw-rtk/ui';
import { XIcon } from 'lucide-react';

interface FilterChipProps {
  children: ReactNode;
  onClick?: () => void;
}

export const FilterChip = ({ children, onClick }: FilterChipProps) => {
  return (
    <Button color="secondary" size="sm" onClick={onClick}>
      <Flex alignItems="center" gap="sm">
        <span>{children}</span>
        <XIcon />
      </Flex>
    </Button>
  );
};
