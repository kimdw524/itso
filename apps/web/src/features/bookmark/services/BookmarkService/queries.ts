import type { RequestType } from '@/shared/utils';

import { service } from './service';

const queryKeys = {
  getIsBookmarked: (params: RequestType<typeof service.getIsBookmarked>) => [
    'bookmark',
    'isBookmarked',
    params.type,
    params.id,
  ],
};

export const queries = {
  getIsBookmarked: (params: RequestType<typeof service.getIsBookmarked>) => ({
    queryKey: queryKeys.getIsBookmarked(params),
    queryFn: () => service.getIsBookmarked(params),
  }),
};
