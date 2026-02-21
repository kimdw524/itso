import Link from 'next/link';

import { Button } from '@kimdw-rtk/ui';
import { HouseIcon } from 'lucide-react';

export const HomeButton = () => {
  return (
    <Link href="/">
      <Button
        color="secondary"
        fontSize="icon-lg"
        size="icon-xl"
        sx={{ color: 'secondary-foreground' }}
        variant="outlined"
      >
        <HouseIcon />
      </Button>
    </Link>
  );
};
