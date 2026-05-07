import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Index(['type', 'target'])
@Entity({ name: 'log' })
export class Log {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 24 })
  type!: string;

  @Column({ type: 'varchar', length: 32 })
  target!: string;

  @Column({ name: 'user_id', nullable: true })
  userId!: number;

  @Column({ name: 'ip', type: 'varchar', length: 45, nullable: true })
  ip!: string;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
