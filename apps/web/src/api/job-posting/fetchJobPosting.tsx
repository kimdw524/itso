import type {
  EmploymentType,
  JobId,
  JobPostingSummary,
} from '@/domains/job-posting/types/job-posting';

import { axiosInstance } from '../axiosInstance';
import type { CursorPaginatedResponse } from '../types';

export type FetchJobPostingResponse =
  CursorPaginatedResponse<JobPostingSummary>;

export interface FetchJobPostingParams {
  companyId?: number;
  title?: string;
  jobIds?: JobId[];
  minExperience?: number;
  maxExperience?: number;
  employmentTypes?: EmploymentType[];
  cursor?: number;
  limit?: number;
}

export const fetchJobPosting = async (params: FetchJobPostingParams) => {
  const res = await axiosInstance.get<FetchJobPostingResponse>('/job-posting', {
    params,
  });

  return res.data;
};
