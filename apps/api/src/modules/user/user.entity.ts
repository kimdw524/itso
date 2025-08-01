import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserType } from './user.types';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'varchar', length: 16 })
  type: UserType;

  @Column({ type: 'varchar', length: 256, nullable: true })
  profile: string;

  @Column({
    name: 'last_signed_in_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastSignedInAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
