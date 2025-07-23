import type { FetchJobPostingParams } from '@/api/job-posting/fetchJobPosting';

export const QUERY_KEYS = {
  'job-posting': {
    list: (params: FetchJobPostingParams) => ['job-posting', 'list', params],
  },
};
