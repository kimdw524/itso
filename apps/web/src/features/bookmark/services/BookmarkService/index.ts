import * as queries from './queries';
import { service } from './service';

export const BookmarkService = {
  ...service,
  ...queries,
};
