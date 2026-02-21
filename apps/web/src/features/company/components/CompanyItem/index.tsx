import Link from 'next/link';

import { Box, Typography } from '@kimdw-rtk/ui';
import { ChevronRight, StarIcon } from 'lucide-react';

import { Separator } from '@/shared/components';
import { getTimeSince } from '@/shared/utils';

import type { Company } from '../../models';
import { CompanyLogo } from '../CompanyLogo';
import { Info } from './Info';
import * as s from './style.css';

interface CompanyItemProps {
  company: Company;
}

export const CompanyItem = ({ company }: CompanyItemProps) => {
  return (
    <Link draggable={false} href={`/post?companyId=${company.id}`}>
      <Box
        alignItems={{ desktop: 'center', mobile: 'flex-start' }}
        className={s.container}
        flexDirection={{ desktop: 'row', mobile: 'column' }}
        gap="lg"
        justifyContent="space-between"
        paddingX="xl"
        paddingY="2xl"
        flex
      >
        <div>
          <Box className={s.imageContainer}>
            <CompanyLogo
              alt={company.name}
              logo={company.logo}
              style={{ maxHeight: '1.5rem' }}
            />
          </Box>
          <Typography
            fontSize="xl"
            fontWeight="semiBold"
            sx={{ paddingTop: '2xl', paddingBottom: 'xl' }}
          >
            {company.name}
          </Typography>
          <Box alignItems="center" color="secondary-foreground" gap="md" flex>
            <Separator separator={<span className={s.separator} />}>
              <Info icon={<StarIcon size="1rem" />}>{company.bookmarks}</Info>
              <Info text="마지막 공고">
                {company.lastPostedAt === null
                  ? '없음'
                  : getTimeSince(new Date(company.lastPostedAt))}
              </Info>
            </Separator>
          </Box>
        </div>
        <Box alignItems="center" flex>
          <span>{company.postings}개 공고 확인하기</span>
          <ChevronRight className={s.navigation} strokeWidth={1} />
        </Box>
      </Box>
    </Link>
  );
};
