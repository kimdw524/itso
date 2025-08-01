import type { FetchIsBookmarkedParams } from '@/api/bookmark/fetchIsBookmarked.client';
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
  bookmark: (params: FetchIsBookmarkedParams) => [
    'bookmark',
    params.type,
    params.id,
  ],
};
