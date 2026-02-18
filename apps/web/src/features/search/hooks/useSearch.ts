import { useMemo } from 'react';

import { SearchService } from '../services';

export const useSearch = (query: string) => {
  const { company, positionPreset } = SearchService.useFetchSearch();

  const companies = useMemo(() => {
    if (query.length === 0) {
      return [];
    }

    return company.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, company]);

  const positionPresets = useMemo(() => {
    if (query.length === 0) {
      return [];
    }

    return positionPreset.filter((item) => item.name.includes(query));
  }, [query, positionPreset]);

  return { companies, positionPresets };
};
