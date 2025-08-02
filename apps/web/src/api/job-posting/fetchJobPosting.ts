import type { JobPosting } from '@/domains/job-posting/types/job-posting';

import { fetcher } from '../fetcher';

export type FetchJobPostingResponse = JobPosting;

export interface FetchJobPostingParams {
  id: number;
}

export const fetchJobPosting = async (
  params: FetchJobPostingParams,
): Promise<FetchJobPostingResponse> => {
  const response = await fetcher<FetchJobPostingResponse>(
    `/job-posting/${params.id}`,
    {
      method: 'GET',
      params,
    },
  );

  return await response.json();
};
