import type { RequestType } from '@/utils/http';

import { service } from './service';

export const queryKeys = {
  isBookmarked: (params: RequestType<typeof service.getIsBookmarked>) => [
    'bookmark',
    'isBookmarked',
    params.type,
  ],
};

export const queryOptions = {
  isBookmarked: (params: RequestType<typeof service.getIsBookmarked>) => ({
    queryKey: queryKeys.isBookmarked(params),
    queryFn: () => service.getIsBookmarked(params),
  }),
};
