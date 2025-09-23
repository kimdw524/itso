import { JobPostingHorizontalList } from '@/domains/job-posting/components/JobPostingHorizontalList';
import { JobPostingItemLoading } from '@/domains/job-posting/components/JobPostingItem/loading';

export const JobPostingListLoading = async () => {
  return (
    <JobPostingHorizontalList>
      {new Array(5).fill(0).map((_, index) => (
        <JobPostingItemLoading key={index} />
      ))}
    </JobPostingHorizontalList>
  );
};
