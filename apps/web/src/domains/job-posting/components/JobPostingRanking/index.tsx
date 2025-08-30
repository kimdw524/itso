import { fetchJobPostingList } from '@/api/job-posting/fetchJobPostingList';

import { JobPostingHorizontalList } from '../JobPostingHorizontalList';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingRankingLoading } from './loading';

export const JobPostingRanking = async () => {
  const { data } = await fetchJobPostingList({
    orderBy: 'recentViews',
    limit: 8,
  });

  if (data.length === 0) {
    return <JobPostingRankingLoading />;
  }

  return (
    <JobPostingHorizontalList>
      {data.map((jobPosting) => (
        <JobPostingItem
          key={jobPosting.id}
          jobPosting={jobPosting}
          company={jobPosting.company}
        />
      ))}
    </JobPostingHorizontalList>
  );
};
