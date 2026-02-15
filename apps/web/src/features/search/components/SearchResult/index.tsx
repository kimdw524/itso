import { Box } from '@kimdw-rtk/ui';

import { useSearch } from '../../hooks/useSearch';
import { CompanyItem } from './CompanyItem';
import { NotFound } from './NotFound';
import { PositionPresetItem } from './PositionPresetItem';
import { SearchResultSection } from './SearchResultSection';
import * as s from './style.css';

interface SearchResultProps {
  query: string;
}

export const SearchResult = ({ query }: SearchResultProps) => {
  const { companies, positionPresets } = useSearch(query);

  const isNotFound = companies.length === 0 && positionPresets.length === 0;

  return (
    <Box className={s.container} rounded>
      {isNotFound && <NotFound />}
      {positionPresets.length > 0 && (
        <SearchResultSection name="포지션">
          {positionPresets.map((positionPreset) => (
            <PositionPresetItem
              key={positionPreset.id}
              positionPreset={positionPreset}
            />
          ))}
        </SearchResultSection>
      )}
      {companies.length > 0 && (
        <SearchResultSection name="기업">
          {companies.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </SearchResultSection>
      )}
    </Box>
  );
};
