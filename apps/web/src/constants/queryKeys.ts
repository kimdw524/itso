import type { FetchIsBookmarkedParams } from '@/api/bookmark/fetchIsBookmarked';
import type { FetchBookmarkedJobPostingListParams } from '@/api/job-posting/fetchBookmarkedJobPostingList';
import type { FetchJobPostingListParams } from '@/api/job-posting/fetchJobPostingList';

export const QUERY_KEYS = {
  'job-posting': {
    list: (params: FetchJobPostingListParams) => [
      'job-posting',
      'list',
      params,
    ],
    bookmarkedList: (params: FetchBookmarkedJobPostingListParams) => [
      'job-posting',
      'bookmarkedList',
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
