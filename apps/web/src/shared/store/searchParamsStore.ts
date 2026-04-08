import {
  createSearchParamsStore,
  Serializer,
} from '@kimdw-rtk/react-search-params';

const serializer = Serializer.delimiter(',');

export const searchParamsStore = createSearchParamsStore({
  serializer,
});
