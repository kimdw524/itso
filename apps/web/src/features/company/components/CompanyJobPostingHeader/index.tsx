import Link from 'next/link';

import { Box, Button, Typography } from '@kimdw-rtk/ui';
import { ArrowLeftIcon } from 'lucide-react';

import { StickyHeader } from '@/shared/components';

import { CompanyService } from '../../services';

interface CompanyJobPostingHeaderProps {
  id: number;
}

export const CompanyJobPostingHeader = async ({
  id,
}: CompanyJobPostingHeaderProps) => {
  const data = await CompanyService.getCompany({ id });

  return (
    <StickyHeader>
      <Box alignItems="center" gap="lg" flex>
        <Link href="/company">
          <Button color="secondary" size="icon-md" variant="ghost">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <Box gap="sm" flex>
          <Typography fontSize="lg" fontWeight="semiBold">
            {data.name}
          </Typography>
          <Typography fontSize="lg">채용공고</Typography>
        </Box>
      </Box>
    </StickyHeader>
  );
};
