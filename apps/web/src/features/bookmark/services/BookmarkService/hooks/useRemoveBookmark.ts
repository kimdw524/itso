import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { RequestType, ResponseType } from '@/shared/utils';

import { queries } from '../queries';
import { service } from '../service';

export const useRemoveBookmark = ({
  type,
  id,
}: RequestType<typeof service.getIsBookmarked>) => {
  const queryClient = useQueryClient();
  const queryKey = queries.getIsBookmarked({ type, id }).queryKey;

  return useMutation({
    mutationFn: () => service.deleteBookmark({ type, id }),
    onMutate: () => {
      queryClient.setQueryData(queryKey, {
        isBookmarked: false,
      } satisfies ResponseType<typeof service.getIsBookmarked>);
    },
  });
};
