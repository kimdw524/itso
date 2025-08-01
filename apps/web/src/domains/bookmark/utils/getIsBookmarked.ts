import 'server-only';

import { fetchIsBookmarked } from '@/api/bookmark/fetchIsBookmarked.server';
import { fetchUserInfo } from '@/api/user/fetchUserInfo.server';

export const getIsBookmarked = async ({
  type,
  id,
}: Parameters<typeof fetchIsBookmarked>[0]): Promise<boolean> => {
  const userInfo = await fetchUserInfo();

  return userInfo === null
    ? false
    : (await fetchIsBookmarked({ type, id })).isBookmarked;
};
