import { withSuspense } from '@repo/utils';

import { JobPostingHorizontalList } from '@/domains/job-posting/components/JobPostingHorizontalList';
import { JobPostingItem } from '@/domains/job-posting/components/JobPostingItem';
import { JobPostingService } from '@/domains/job-posting/services/JobPostingService';

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
