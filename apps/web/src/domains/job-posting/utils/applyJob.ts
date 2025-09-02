import type { JobPosting } from '../types/job-posting';

export const applyJob = (jobPosting: JobPosting) => {
  window.open(jobPosting.link);
};
