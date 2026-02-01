import { withSuspense } from '@kimdw-rtk/utils';

import { JobPostingHorizontalList } from '@/features/job-posting/components/JobPostingHorizontalList';
import { JobPostingItem } from '@/features/job-posting/components/JobPostingItem';
import { JobPostingService } from '@/features/job-posting/services/JobPostingService';

import { JobPostingListLoading } from './loading';

interface JobPostingListProps {
  orderBy: Parameters<typeof JobPostingService.getJobPostingList>[0]['orderBy'];
}

export const JobPostingList = withSuspense(
  async ({ orderBy }: JobPostingListProps) => {
    const { data } = await JobPostingService.getJobPostingList({
      orderBy,
      limit: 8,
    });

    if (data.length === 0) {
      return <JobPostingListLoading />;
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
  },
  <JobPostingListLoading />,
);
