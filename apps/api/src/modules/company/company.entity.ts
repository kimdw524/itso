import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 512, nullable: true })
  logo: string;

  @Column({ default: 0 })
  bookmarks: number;
}
