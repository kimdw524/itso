import { useQuery } from '@tanstack/react-query';

import type { RequestType } from '@/shared/utils/http';

import { queryOptions } from '../queries';
import type { service } from '../service';

export const useFetchIsBookmarked = (
  params: RequestType<typeof service.getIsBookmarked>,
) => {
  const { data } = useQuery(queryOptions.isBookmarked(params));

  return { data };
};
