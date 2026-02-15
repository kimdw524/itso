import * as hooks from './hooks';
import * as queries from './queries';
import { service } from './service';

export const SearchService = {
  ...service,
  ...queries,
  ...hooks,
};
