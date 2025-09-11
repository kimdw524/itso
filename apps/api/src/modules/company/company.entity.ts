import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 40, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 512, nullable: true })
  logo: string;

  @Index()
  @Column({ default: 0 })
  bookmarks: number;
}
