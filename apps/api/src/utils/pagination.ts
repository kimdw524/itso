import { CursorPaginatedResponse } from '@/types/pagination';

/**
 * limit + 1개로 조회한 데이터를 커서 페이지네이션 응답으로 변환한다.
 */
export const createCursorPage = <T>(
  data: T[],
  limit: number,
  getNextCursor: (lastItem: T) => string,
): CursorPaginatedResponse<T> => {
  const hasNext = data.length > limit;
  const slicedData = hasNext ? data.slice(0, limit) : data;
  const lastItem = slicedData.at(-1);

  return {
    data: slicedData,
    hasNext,
    nextCursor: hasNext && lastItem ? getNextCursor(lastItem) : null,
  };
};

/**
 * `cursor,cursorId` 형식의 복합 커서를 객체로 변환합니다.
 */
export const parseCompositeCursor = (cursor?: string) => {
  const [cursorValue, cursorId] = cursor?.split(',') ?? [];
  const id = Number(cursorId);

  return {
    cursor: cursorValue,
    cursorId: isFinite(id) ? id : 0,
  };
};

/**
 * `cursor,cursorId` 형식의 복합 커서 문자열로 변환합니다.
 */
export const stringifyCompositeCursor = ({
  cursor,
  cursorId,
}: {
  cursor: string;
  cursorId: number;
}): string => {
  return `${cursor},${cursorId}`;
};
