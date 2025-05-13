import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'master_amenities' })
export class MasterAmenitiesDB {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 250 })
  amenities: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @Column({ type: 'varchar', length: 200 })
  created_by: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  updated_by: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  deleted_by: string;
}
