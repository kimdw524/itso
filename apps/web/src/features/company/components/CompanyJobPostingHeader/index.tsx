import Link from 'next/link';

import { Box, Button, Typography } from '@kimdw-rtk/ui';
import { ArrowLeftIcon } from 'lucide-react';

import { StickyHeader } from '@/shared/components/StickyHeader';

import { CompanyService } from '../../services/CompanyService';

interface CompanyJobPostingHeaderProps {
  id: number;
}

export const CompanyJobPostingHeader = async ({
  id,
}: CompanyJobPostingHeaderProps) => {
  const data = await CompanyService.getCompany({ id });

  return (
    <StickyHeader>
      <Box flex gap="lg" alignItems="center">
        <Link href="/company">
          <Button variant="ghost" color="secondary" size="icon-md">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <Box flex gap="sm">
          <Typography fontWeight="semiBold" fontSize="lg">
            {data.name}
          </Typography>
          <Typography fontSize="lg">채용공고</Typography>
        </Box>
      </Box>
    </StickyHeader>
  );
};
