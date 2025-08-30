import { Suspense } from 'react';

import { Box } from '@repo/ui';

import { Section } from '@/components/Section';
import { JobPostingRanking } from '@/domains/job-posting/components/JobPostingRanking';
import { JobPostingRankingLoading } from '@/domains/job-posting/components/JobPostingRanking/loading';

export default async function HomePage() {
  return (
    <Box
      padding={{ desktop: '2xl', mobile: 'xl' }}
      fontSize={{ desktop: 'md', mobile: 'sm' }}
      style={{ isolation: 'isolate' }}
    >
      <Section
        title="🔥 인기 공고"
        description="최근 3일 기준으로 조회수가 가장 높은 공고를 정리했어요."
      >
        <Suspense fallback={<JobPostingRankingLoading />}>
          <JobPostingRanking />
        </Suspense>
      </Section>
    </Box>
  );
}
