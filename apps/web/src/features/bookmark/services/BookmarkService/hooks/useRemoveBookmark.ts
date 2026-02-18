import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { RequestType, ResponseType } from '@/shared/utils';

import { queryKeys } from '../queries';
import { service } from '../service';

export const useRemoveBookmark = ({
  type,
  id,
}: RequestType<typeof service.getIsBookmarked>) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.isBookmarked({ type, id });

  return useMutation({
    mutationFn: () => service.deleteBookmark({ type, id }),
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: false,
      } satisfies ResponseType<typeof service.getIsBookmarked>);
    },
  });
};
