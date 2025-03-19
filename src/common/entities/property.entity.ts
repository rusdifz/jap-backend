import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import {
  LocationEnum,
  PropertyStatusEnum,
  PropertyTypeEnum,
  StatusPublishEnum,
} from 'src/common';

import { PropertyAbstract } from '../interfaces/property.interface';

import { UnitsDB } from './unit.entity';
import { MediaDB } from './media.entity';

@Entity({ name: 'properties' })
// @Entity({ name: 'properties_dummy' })
export class PropertiesDB implements PropertyAbstract {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  property_id: number;

  @Column({ type: 'int', default: 0 })
  popular: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusPublishEnum,
    default: StatusPublishEnum.DRAFT,
  })
  status_publish: StatusPublishEnum;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.LEASE,
  })
  property_status: PropertyStatusEnum;

  @Column({ type: 'int', default: 0 })
  total_unit: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  price_overtime_electricity: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  price_overtime_lighting: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  price_overtime_ac: string;

  @Column({ type: 'int', nullable: true })
  price_ground_floor_sqm: number;

  @Column({ type: 'int', nullable: true })
  price_rent_sqm: number;

  @Column({ type: 'int', nullable: true })
  service_charge: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  service_charge_info: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_charge_reserved_car: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_charge_reserved_motorcycle: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_charge_unreserved_car: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_charge_unreserved_motorcycle: string;

  @Column({ type: 'text', nullable: true })
  phone_deposit: string;

  @Column({
    type: 'enum',
    enum: PropertyTypeEnum,
    default: PropertyTypeEnum.OFFICE,
  })
  property_type: PropertyTypeEnum;

  @Column({ type: 'int', nullable: true })
  property_size: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  completion: string;

  @Column({ type: 'simple-array' })
  amenities: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  office_hours_weekday: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  office_hours_weekend: string;

  @Column({ type: 'int', nullable: true })
  total_floor: number;

  @Column({ type: 'int', nullable: true })
  size_floor: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: LocationEnum,
    default: LocationEnum.AMPERA,
  })
  location: LocationEnum;

  @Column({ type: 'varchar', length: 200, nullable: true })
  koordinat_map: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nearby_bus_station: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nearby_hospital: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nearby_police: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nearby_mall: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provider_internet: string;

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

  @OneToMany(() => UnitsDB, (unit) => unit.property, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  units?: UnitsDB[];

  @OneToMany(() => MediaDB, (media) => media.property, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  images?: MediaDB[];
}
