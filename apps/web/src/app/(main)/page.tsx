import { Box } from '@kimdw-rtk/ui';

import { SearchService } from '@/features/search/services';
import { Section } from '@/shared/components';

import { FilterShortcut, HomeHeader, JobPostingList } from './_components';

export default async function HomePage() {
  const searchKeywords = await SearchService.getRandomSearchKeywords(5);

  return (
    <Box
      flexDirection="column"
      fontSize={{ desktop: 'md', mobile: 'sm' }}
      gap="4xl"
      paddingY={{ desktop: '2xl', mobile: 'xl' }}
      style={{ isolation: 'isolate' }}
      flex
    >
      <HomeHeader searchKeywords={searchKeywords} />
      <Section title="인기 포지션">
        <FilterShortcut />
      </Section>
      <Section
        description="최근 3일 기준으로 조회수가 가장 높은 공고를 정리했어요."
        title="인기 공고"
      >
        <JobPostingList orderBy="recentViews" />
      </Section>
      <Section
        description="직무와 상관없이 가장 최근에 올라온 공고들이에요."
        title="최신 공고"
      >
        <JobPostingList orderBy="createdAt" />
      </Section>
    </Box>
  );
}
