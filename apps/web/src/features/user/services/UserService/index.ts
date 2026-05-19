import * as queries from './queries';
import { service } from './service';

export const UserService = {
  ...service,
  ...queries,
};
