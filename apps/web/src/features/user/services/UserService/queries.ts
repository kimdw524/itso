import { service } from './service';

const queryKeys = {
  getInfo: () => ['user', 'info'],
};

export const queries = {
  getInfo: () => ({
    queryKey: queryKeys.getInfo(),
    queryFn: service.getInfo,
    staleTime: 3600 * 1000,
    gcTime: 0,
  }),
};
