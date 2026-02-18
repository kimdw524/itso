import { JOB_POSTING } from '../constants';
import type { JobId } from '../models';

export const formatJobName = (jobId: JobId): string => {
  return JOB_POSTING.JOB_NAME[jobId];
};
