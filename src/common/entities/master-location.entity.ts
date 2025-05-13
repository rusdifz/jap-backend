import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IMasterLocation } from '../interfaces/master-location';

@Entity({ name: 'master_location' })
export class MasterLocationDB implements IMasterLocation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Column({ type: 'varchar', length: 250 })
  location_name: string;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'boolean', default: false })
  activate_home: boolean;

  @Column({ type: 'varchar', length: 250 })
  url_image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;

  @Column({ type: 'varchar', length: 200 })
  created_by: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  updated_by?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  deleted_by?: string;
}
