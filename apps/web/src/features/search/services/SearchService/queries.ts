import { service } from './service';

export const queryKeys = {
  company: ['search', 'company'] as const,
  'position-preset': ['search', 'position-preset'] as const,
};

export const queryOptions = {
  company: {
    queryKey: queryKeys.company,
    queryFn: () => service.getCompanies(),
  },
  'position-preset': {
    queryKey: queryKeys['position-preset'],
    queryFn: () => service.getPositionPresets(),
  },
};
