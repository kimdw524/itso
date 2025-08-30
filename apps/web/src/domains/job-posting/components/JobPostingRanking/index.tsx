import { fetchJobPostingRanking } from '@/api/job-posting/fetchJobPostingRanking';

import { JobPostingHorizontalList } from '../JobPostingHorizontalList';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingRankingLoading } from './loading';

export const JobPostingRanking = async () => {
  const data = await fetchJobPostingRanking({});

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
