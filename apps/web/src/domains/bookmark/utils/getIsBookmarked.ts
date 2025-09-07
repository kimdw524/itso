import 'server-only';

import { fetchUserInfo } from '@/api/user/fetchUserInfo';
import type { RequestType } from '@/utils/http';

import { BookmarkService } from '../services/BookmarkService';

export const getIsBookmarked = async ({
  type,
  id,
}: RequestType<typeof BookmarkService.getIsBookmarked>): Promise<boolean> => {
  const userInfo = await fetchUserInfo();

  return userInfo === null
    ? false
    : (await BookmarkService.getIsBookmarked({ type, id })).isBookmarked;
};
