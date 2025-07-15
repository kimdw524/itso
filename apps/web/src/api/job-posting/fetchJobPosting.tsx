import type { EmploymentType, JobPostingSummary } from '@/domains/job-posting/types/job-posting';

import { axiosInstance } from '../axiosInstance';
import type { CursorPaginatedResponse } from '../types';

export type FetchJobPostingResponse = CursorPaginatedResponse<JobPostingSummary>;

export interface FetchJobPostingParams {
  companyId?: number;
  title?: string;
  jobIds?: number[];
  minExperience?: number;
  maxExperience?: number;
  employmentType?: EmploymentType;
  cursor?: number;
  limit?: number;
}

export const fetchJobPosting = async (params: FetchJobPostingParams) => {
  const res = await axiosInstance.get<FetchJobPostingResponse>('/job-posting', {
    params,
  });

  return res.data;
};
