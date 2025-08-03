import type { JobPostingSummary } from '@/domains/job-posting/types/job-posting';

import { fetcher } from '../fetcher';
import type { CursorPaginatedResponse } from '../types';

export type FetchBookmarkedJobPostingListResponse = CursorPaginatedResponse<
  JobPostingSummary,
  string
>;

export interface FetchBookmarkedJobPostingListParams {
  cursor?: string;
  limit?: number;
}

export const fetchBookmarkedJobPostingList = async (
  params: FetchBookmarkedJobPostingListParams,
): Promise<FetchBookmarkedJobPostingListResponse> => {
  const response = await fetcher<FetchBookmarkedJobPostingListResponse>(
    '/job-posting/bookmark',
    {
      method: 'GET',
      params,
    },
  );

  return await response.json();
};
