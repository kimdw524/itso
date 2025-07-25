import type {
  EmploymentType,
  JobId,
  JobPostingSummary,
} from '@/domains/job-posting/types/job-posting';

import { axiosInstance } from '../axiosInstance';
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
  const res = await axiosInstance.get<FetchJobPostingListResponse>(
    '/job-posting',
    {
      params,
    },
  );

  return res.data;
};
