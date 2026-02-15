import { useQuery } from '@tanstack/react-query';

import { queryOptions } from '../queries';

export const useFetchSearch = () => {
  const { data: companyData } = useQuery(queryOptions.company);
  const { data: positionPresetData } = useQuery(
    queryOptions['position-preset'],
  );

  return {
    company: companyData ?? [],
    positionPreset: positionPresetData ?? [],
  };
};
