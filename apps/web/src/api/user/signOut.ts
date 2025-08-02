import 'server-only';

import { fetcher } from '../fetcher';

export const signOut = async (): Promise<void> => {
  await fetcher(`/auth`, {
    method: 'DELETE',
  });

  return;
};
