import { useMemo } from 'react';

import { pickRandomFromSet } from '@/shared/utils';

import { SearchService } from '../services';

export const useRandomKeywords = (count: number) => {
  const { company, positionPreset } = SearchService.useFetchSearch();
  return useMemo(() => {
    const keywords = new Set([
      ...company.map((item) => item.name),
      ...positionPreset.map((item) => item.name),
    ]);

    return pickRandomFromSet(keywords, count);
  }, [company, positionPreset, count]);
};
