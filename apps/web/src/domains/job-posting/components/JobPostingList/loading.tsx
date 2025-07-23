import { JOB_POSTING } from '../../constants/job-posting';
import { JobPostingItemLoading } from '../JobPostingItem/loading';

export const JobPostingListLoading = () => {
  return (
    <>
      {new Array(JOB_POSTING.LIST_LIMIT).fill(0).map((_, index) => (
        <JobPostingItemLoading key={index} />
      ))}
    </>
  );
};
