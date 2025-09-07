import type { CursorPaginatedResponse } from '@/api/types';
import { http } from '@/utils/http';

import type {
  EmploymentType,
  JobId,
  JobPosting,
  JobPostingSummary,
} from '../../models';

export const service = {
  async getJobPosting(params: { id: number }) {
    return http.get<JobPosting>(`/job-posting/${params.id}`, { params });
  },

  async getJobPostingList(params: {
    companyId?: number;
    title?: string;
    jobIds?: JobId[];
    minExperience?: number;
    maxExperience?: number;
    employmentTypes?: EmploymentType[];
    orderBy?: 'createdAt' | 'recentViews';
    cursor?: number;
    limit?: number;
  }) {
    return http.get<CursorPaginatedResponse<JobPostingSummary, number>>(
      '/job-posting',
      { params },
    );
  },

  async getBookmarkedJobPostingList(params: {
    cursor?: string;
    limit?: number;
  }) {
    return http.get<CursorPaginatedResponse<JobPostingSummary, string>>(
      '/job-posting/bookmark',
      { params },
    );
  },
};
