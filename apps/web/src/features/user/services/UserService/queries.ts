import { service } from './service';

export const queryKeys = {
  info: ['user', 'info'],
};

export const queryOptions = {
  info: {
    queryKey: queryKeys.info,
    queryFn: service.getInfo,
    staleTime: 3600 * 1000,
    gcTime: 0,
  },
};
