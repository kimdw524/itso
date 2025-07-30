import 'server-only';

import { fetcher } from '../fetcher';

export const signOut = async (): Promise<void> => {
  await fetcher(`${process.env.API_BASE_URL}/auth`, {
    method: 'DELETE',
  });

  return;
};
