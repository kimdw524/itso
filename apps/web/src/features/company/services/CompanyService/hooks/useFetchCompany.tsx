import { useQuery } from '@tanstack/react-query';

import type { RequestType } from '@/shared/utils';

import { queryOptions } from '../queries';
import type { service } from '../service';

export const useFetchCompany = (
  params: RequestType<typeof service.getCompany>,
) => {
  const { data, isSuccess } = useQuery(queryOptions.data(params));
  return { data, isSuccess };
};
