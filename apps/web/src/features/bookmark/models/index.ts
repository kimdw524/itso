export type BookmarkType = 'company' | 'job-posting';

export interface Bookmark {
  userId: number;
  targetId: number;
  targetType: BookmarkType;
  createdAt: string;
}
