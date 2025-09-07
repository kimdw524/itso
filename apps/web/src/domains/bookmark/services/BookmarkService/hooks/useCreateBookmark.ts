import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDialog } from '@repo/ui';

import { MESSAGE } from '@/constants/message';
import type { RequestType, ResponseType } from '@/utils/http';

import { queryKeys } from '../queries';
import { service } from '../service';

export const useCreateBookmark = (
  params: RequestType<typeof service.createBookmark>,
) => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const queryKey = queryKeys.isBookmarked(params);

  return useMutation({
    mutationFn: () => service.createBookmark(params),
    onError: (error: Response) => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: false,
      } satisfies ResponseType<typeof service.getIsBookmarked>);

      if (error.status === 401) {
        alert(MESSAGE.BOOKMARK.SIGN_IN_REQUIRED);
      }
    },
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: true,
      } satisfies ResponseType<typeof service.getIsBookmarked>);
    },
  });
};
