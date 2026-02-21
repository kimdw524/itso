import { JobPostingHorizontalList } from '@/features/job-posting/components/JobPostingHorizontalList';
import { JobPostingItemLoading } from '@/features/job-posting/components/JobPostingItem/loading';

export const JobPostingListLoading = async () => {
  return (
    <JobPostingHorizontalList>
      {new Array(5).fill(0).map((_, index) => (
        <JobPostingItemLoading key={index} />
      ))}
    </JobPostingHorizontalList>
  );
};
