import type {
  JobId,
  JobPostingSummary,
} from '@/domains/job-posting/types/job-posting';

import { fetcher } from '../fetcher';

export type FetchJobPostingRankingResponse = JobPostingSummary[];

export interface FetchJobPostingRankingParams {
  jobIds?: JobId[];
}

export const fetchJobPostingRanking = async (
  params: FetchJobPostingRankingParams,
) => {
  const res = await fetcher<FetchJobPostingRankingResponse>(
    '/job-posting/ranking',
    {
      method: 'GET',
      params,
    },
  );

  return (await res.json()) as FetchJobPostingRankingResponse;
};
