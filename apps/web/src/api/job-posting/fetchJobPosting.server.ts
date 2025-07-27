import type { JobPosting } from '@/domains/job-posting/types/job-posting';

export type FetchJobPostingResponse = JobPosting;

export interface FetchJobPostingParams {
  id: number;
}

export const fetchJobPosting = async (
  params: FetchJobPostingParams,
): Promise<FetchJobPostingResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/job-posting/${params.id}`,
    {
      method: 'GET',
    },
  );

  return response.json();
};
