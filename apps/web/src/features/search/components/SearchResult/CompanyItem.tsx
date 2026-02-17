import Link from 'next/link';

import { Flex } from '@kimdw-rtk/ui';

import { CompanyLogo } from '@/features/company/components/CompanyLogo';
import type { Company } from '@/features/company/models';

import * as s from './style.css';

interface CompanyItemProps {
  company: Company;
}

export const CompanyItem = ({ company }: CompanyItemProps) => {
  return (
    <Link href={`/company/${company.id}`}>
      <Flex alignItems="center" className={s.item} gap="md">
        <CompanyLogo
          alt={company.name}
          logo={company.logo}
          style={{ width: '2rem', height: '2rem' }}
          isSquare
        />
        {company.name}
      </Flex>
    </Link>
  );
};
