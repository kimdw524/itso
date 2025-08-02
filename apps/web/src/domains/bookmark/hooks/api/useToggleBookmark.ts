import type { BookmarkType } from '../../types/bookmark';
import { useCreateBookmark } from './useCreateBookmark';
import { useFetchIsBookmarked } from './useFetchIsBookmarked';
import { useRemoveBookmark } from './useRemoveBookmark';

interface UseToggleBookmarkProps {
  type: BookmarkType;
  id: number;
}

export const useToggleBookmark = ({ type, id }: UseToggleBookmarkProps) => {
  const { mutate: addBookmark, isPending: isAddPending } = useCreateBookmark({
    type,
    id,
  });
  const { mutate: removeBookmark, isPending: isRemovePending } =
    useRemoveBookmark({ type, id });
  const { data } = useFetchIsBookmarked({ type, id });

  const isBookmarked = !!data?.isBookmarked;

  const toggle = () => {
    const isPending = isAddPending || isRemovePending;

    if (isPending) {
      return;
    }

    if (isBookmarked) {
      removeBookmark();
      return;
    }

    addBookmark();
  };

  return { isBookmarked, toggle };
};
