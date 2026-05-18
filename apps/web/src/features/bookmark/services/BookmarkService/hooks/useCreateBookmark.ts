import { useDialog } from '@kimdw-rtk/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MESSAGE } from '@/shared/constants';
import type { RequestType, ResponseType } from '@/shared/utils';

import { queries } from '../queries';
import { service } from '../service';

export const useCreateBookmark = (
  params: RequestType<typeof service.createBookmark>,
) => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const queryKey = queries.getIsBookmarked(params).queryKey;

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
