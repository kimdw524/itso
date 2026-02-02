import * as hooks from './hooks';
import * as queries from './queries';
import { service } from './service';

export const CompanyService = {
  ...service,
  ...queries,
  ...hooks,
};
