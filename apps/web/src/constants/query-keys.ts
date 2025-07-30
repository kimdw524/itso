import type { FetchJobPostingListParams } from '@/api/job-posting/fetchJobPostingList.client';

export const QUERY_KEYS = {
  'job-posting': {
    list: (params: FetchJobPostingListParams) => [
      'job-posting',
      'list',
      params,
    ],
  },
  user: {
    info: ['user', 'info'],
  },
};
