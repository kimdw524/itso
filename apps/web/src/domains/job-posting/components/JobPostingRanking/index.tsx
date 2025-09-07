import { JobPostingService } from '../../services/JobPostingService';
import { JobPostingHorizontalList } from '../JobPostingHorizontalList';
import { JobPostingItem } from '../JobPostingItem';
import { JobPostingRankingLoading } from './loading';

export const JobPostingRanking = async () => {
  const { data } = await JobPostingService.getJobPostingList({
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
