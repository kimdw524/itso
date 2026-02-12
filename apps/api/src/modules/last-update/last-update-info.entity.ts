import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('last_update_info')
export class LastUpdateInfo {
  @PrimaryColumn({ name: 'key', type: 'varchar', length: 128 })
  key: string;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
