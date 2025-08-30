import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { JobPosting } from '../job-posting/job-posting.entity';

@Entity('job_posting_ranking')
export class JobPostingRanking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'posting_id' })
  postingId: number;

  @ManyToOne(() => JobPosting)
  @JoinColumn({ name: 'posting_id' })
  posting: JobPosting;

  @Column()
  views: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
