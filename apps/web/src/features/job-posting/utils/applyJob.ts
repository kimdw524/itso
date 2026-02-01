import type { JobPosting } from '../models';

export const applyJob = (jobPosting: JobPosting) => {
  window.open(jobPosting.link);
};
