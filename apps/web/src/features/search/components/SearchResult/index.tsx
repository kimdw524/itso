import { Box } from '@kimdw-rtk/ui';

import { NotFound } from './NotFound';
import * as s from './style.css';

interface SearchResultProps {
  query: string;
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SearchResult = ({ query }: SearchResultProps) => {
  return (
    <Box className={s.container} rounded>
      <NotFound />
      {/* <SearchResultSection name="포지션">
        <SearchResultItem>1번</SearchResultItem>
        <SearchResultItem>2번</SearchResultItem>
        <SearchResultItem>3번</SearchResultItem>
      </SearchResultSection>
      <SearchResultSection name="기업">
        <SearchResultItem>1번</SearchResultItem>
        <SearchResultItem>2번</SearchResultItem>
        <SearchResultItem>3번</SearchResultItem>
      </SearchResultSection> */}
    </Box>
  );
};
