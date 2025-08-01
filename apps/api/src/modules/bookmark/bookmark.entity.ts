import { CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

import { BookmarkType } from './bookmark.types';

@Entity('bookmark')
@Index(['userId', 'targetType'])
export class Bookmark {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'target_id' })
  targetId: number;

  @PrimaryColumn({ name: 'target_type', type: 'varchar', length: 16 })
  targetType: BookmarkType;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
