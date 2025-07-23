import { JOB_POSTING } from '../constants/job-posting';
import { type JobId } from '../types/job-posting';

export const formatJobName = (jobId: JobId): string => {
  return JOB_POSTING.JOB_NAME[jobId];
};
