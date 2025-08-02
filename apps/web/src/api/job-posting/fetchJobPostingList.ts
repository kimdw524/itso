import type {
  EmploymentType,
  JobId,
  JobPostingSummary,
} from '@/domains/job-posting/types/job-posting';

import { fetcher } from '../fetcher';
import type { CursorPaginatedResponse } from '../types';

export type FetchJobPostingListResponse =
  CursorPaginatedResponse<JobPostingSummary>;

export interface FetchJobPostingListParams {
  companyId?: number;
  title?: string;
  jobIds?: JobId[];
  minExperience?: number;
  maxExperience?: number;
  employmentTypes?: EmploymentType[];
  cursor?: number;
  limit?: number;
}

export const fetchJobPostingList = async (
  params: FetchJobPostingListParams,
) => {
  const res = await fetcher<FetchJobPostingListResponse>('/job-posting', {
    method: 'GET',
    params,
  });

  return await res.json();
};
