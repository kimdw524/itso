import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ length: 40, unique: true })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  logo!: string | null;

  @Index()
  @Column({ default: 0 })
  bookmarks!: number;

  @Index()
  @Column({ default: 0 })
  postings!: number;

  @Index()
  @Column({
    name: 'last_posted_at',
    type: 'datetime',
    nullable: true,
  })
  lastPostedAt!: Date | null;
}
