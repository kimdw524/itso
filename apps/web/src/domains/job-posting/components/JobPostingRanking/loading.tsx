import { JobPostingHorizontalList } from '../JobPostingHorizontalList';
import { JobPostingItemLoading } from '../JobPostingItem/loading';

export const JobPostingRankingLoading = async () => {
  return (
    <JobPostingHorizontalList>
      {new Array(5).fill(0).map((_, index) => (
        <JobPostingItemLoading key={index} />
      ))}
    </JobPostingHorizontalList>
  );
};
