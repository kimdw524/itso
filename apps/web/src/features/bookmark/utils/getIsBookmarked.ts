import 'server-only';

import { UserService } from '@/features/user/services/UserService';
import type { RequestType } from '@/shared/utils/http';

import { BookmarkService } from '../services/BookmarkService';

export const getIsBookmarked = async ({
  type,
  id,
}: RequestType<typeof BookmarkService.getIsBookmarked>): Promise<boolean> => {
  const userInfo = await UserService.getInfo();

  return userInfo === null
    ? false
    : (await BookmarkService.getIsBookmarked({ type, id })).isBookmarked;
};
