import { Box } from '@kimdw-rtk/ui';

import { Section } from '@/shared/components/Section';

import { FilterShortcut } from './_components/FilterShortcut';
import { JobPostingList } from './_components/JobPostingList';

export default async function HomePage() {
  return (
    <Box
      flex
      flexDirection="column"
      gap="4xl"
      padding={{ desktop: '2xl', mobile: 'xl' }}
      fontSize={{ desktop: 'md', mobile: 'sm' }}
      style={{ isolation: 'isolate' }}
    >
      <Section title="인기 포지션">
        <FilterShortcut />
      </Section>
      <Section
        title="인기 공고"
        description="최근 3일 기준으로 조회수가 가장 높은 공고를 정리했어요."
      >
        <JobPostingList orderBy="recentViews" />
      </Section>
      <Section
        title="최신 공고"
        description="직무와 상관없이 가장 최근에 올라온 공고들이에요."
      >
        <JobPostingList orderBy="createdAt" />
      </Section>
    </Box>
  );
}
