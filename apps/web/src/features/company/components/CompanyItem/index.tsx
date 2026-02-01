import Link from 'next/link';

import { Box, Typography } from '@kimdw-rtk/ui';
import { ChevronRight, StarIcon } from 'lucide-react';

import { Separator } from '@/shared/components/Separator';
import { getTimeSince } from '@/shared/utils/date';

import type { Company } from '../../models';
import { Info } from './Info';
import * as s from './style.css';

interface CompanyItemProps {
  company: Company;
}

export const CompanyItem = ({ company }: CompanyItemProps) => {
  return (
    <Link href={`/company/${company.id}`} draggable={false}>
      <Box
        flex
        alignItems={{ desktop: 'center', mobile: 'flex-start' }}
        justifyContent="space-between"
        gap="lg"
        paddingX="xl"
        paddingY="2xl"
        flexDirection={{ desktop: 'row', mobile: 'column' }}
        className={s.container}
      >
        <div>
          <Box className={s.imageContainer}>
            {company.logo && (
              <img
                src={company.logo}
                style={{ maxHeight: '1.5rem' }}
                alt="Logo"
                loading="lazy"
              />
            )}
          </Box>
          <Typography
            fontSize="xl"
            fontWeight="semiBold"
            sx={{ paddingTop: '2xl', paddingBottom: 'xl' }}
          >
            {company.name}
          </Typography>
          <Box flex alignItems="center" gap="md" color="secondary-foreground">
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
        <Box flex alignItems="center">
          <span>{company.postings}개 공고 확인하기</span>
          <ChevronRight strokeWidth={1} className={s.navigation} />
        </Box>
      </Box>
    </Link>
  );
};
