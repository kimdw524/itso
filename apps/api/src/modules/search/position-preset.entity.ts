import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position_preset')
export class PositionPresetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'json' })
  preset: Record<string, unknown>;
}
