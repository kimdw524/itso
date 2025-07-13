import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_posting')
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'posting_id', length: 128 })
  postingId: string;

  @Column({ length: 128 })
  title: string;

  @Column({ name: 'open_date', type: 'datetime' })
  openDate: Date;

  @Column({
    name: 'due_date',
    type: 'datetime',
    nullable: true,
  })
  dueDate?: Date;

  @Column({ name: 'link', length: 2048 })
  link: string;

  @Column({ name: 'job_id', type: 'smallint' })
  jobId: number;

  @Column({ name: 'views', default: 0 })
  views: number;

  @Column({ name: 'min_experience', type: 'tinyint' })
  minExperience: number;

  @Column({ name: 'max_experience', type: 'tinyint' })
  maxExperience: number;

  @Column({ name: 'employment_type', type: 'tinyint' })
  employmentType: number;

  @Column({ type: 'text' })
  description: string;
}
