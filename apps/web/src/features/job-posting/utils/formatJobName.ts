import { JOB_POSTING } from '../constants';
import type { JobId } from '../models';

export const formatJobName = (jobId: number): string => {
  return JOB_POSTING.JOB_NAME?.[jobId as JobId] ?? 'unknown job';
};
