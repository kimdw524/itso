import { useQuery } from '@tanstack/react-query';

import type { RequestType } from '@/shared/utils';

import { queries } from '../queries';
import type { service } from '../service';

export const useFetchIsBookmarked = (
  params: RequestType<typeof service.getIsBookmarked>,
) => {
  const { data } = useQuery(queries.getIsBookmarked(params));

  return { data };
};
