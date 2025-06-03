import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { ConditionUnitEnum, PropertyStatusEnum } from '../enums';

import { PropertiesDB } from './property.entity';
import { Unit } from '../interfaces/units.interface';

@Entity({ name: 'units' })
export class UnitsDB implements Unit {
  @PrimaryGeneratedColumn('uuid')
  unit_id: string;

  @Column({ type: 'bigint' })
  property_id: number;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.LEASE,
  })
  status: PropertyStatusEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  floor: string;

  @Column({ type: 'varchar', nullable: true })
  size: string;

  @Column({
    type: 'enum',
    enum: ConditionUnitEnum,
    default: ConditionUnitEnum.BARE,
  })
  condition: ConditionUnitEnum;

  @Column({ type: 'boolean', default: false })
  available: boolean;

  @Column({ type: 'bigint', nullable: true })
  rent_price: number;

  @Column({ type: 'int', nullable: true })
  service_charge_price: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  service_charge_info: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  pic_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  pic_phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @Column({ type: 'varchar', length: 100 })
  created_by: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  deleted_by: string;

  @ManyToOne(() => PropertiesDB, (office) => office.units, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  property?: PropertiesDB;
}
