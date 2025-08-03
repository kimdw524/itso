import type { BookmarkType } from '../../types/bookmark';
import { useCreateBookmark } from './useCreateBookmark';
import { useRemoveBookmark } from './useRemoveBookmark';

interface UseToggleBookmarkProps {
  type: BookmarkType;
  id: number;
  isBookmarked: boolean;
}

export const useToggleBookmark = ({
  type,
  id,
  isBookmarked,
}: UseToggleBookmarkProps) => {
  const { mutate: addBookmark, isPending: isAddPending } = useCreateBookmark({
    type,
    id,
  });
  const { mutate: removeBookmark, isPending: isRemovePending } =
    useRemoveBookmark({ type, id });

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

  return { toggle };
};
