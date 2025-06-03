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
import { PropertyPicDB } from './property-pic.entity';

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

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusPublishEnum,
    default: StatusPublishEnum.DRAFT,
  })
  status_publish: StatusPublishEnum;

  @Column({ type: 'varchar', length: 250, nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  url_youtube?: string;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.LEASE,
  })
  property_status: PropertyStatusEnum;

  @Column({ type: 'int', default: 0 })
  total_unit: number;

  @Column({ type: 'bigint', default: 0 })
  price_rent_average: number;

  @Column({ type: 'text', nullable: true })
  price_overtime_electricity: string;

  @Column({ type: 'text', nullable: true })
  price_overtime_lighting: string;

  @Column({ type: 'text', nullable: true })
  price_overtime_ac: string;

  @Column({ type: 'int', nullable: true })
  price_ground_floor: number;

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

  @Column({ type: 'text', nullable: true })
  booking_deposit: string;

  @Column({ type: 'text', nullable: true })
  security_deposit: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  minimum_lease_term: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  payment_term: string;

  @Column({ type: 'boolean', default: true })
  telecommunication_isp: boolean;

  @Column({ type: 'boolean', default: true })
  telecommunication_fiber_optic: boolean;

  @Column({ type: 'boolean', default: true })
  telecommunication_wifi: boolean;

  @Column({ type: 'boolean', default: true })
  fire_safety_sprinkle: boolean;

  @Column({ type: 'boolean', default: true })
  fire_safety_heat_detector: boolean;

  @Column({ type: 'boolean', default: true })
  fire_safety_smoke_detector: boolean;

  // @Column({
  //   type: 'enum',
  //   enum: PropertyTypeEnum,
  //   default: PropertyTypeEnum.OFFICE,
  // })
  @Column({ type: 'simple-array' })
  property_type: string[];

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

  @Column({ type: 'varchar', length: 200, nullable: true })
  size_floor: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: LocationEnum,
    default: LocationEnum.KEMANG,
  })
  location: LocationEnum | any;

  @Column({ type: 'varchar', length: 250, nullable: true })
  ac_info: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  electricity_info: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lighting_info: string;

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

  @Column({ type: 'varchar', length: 200, nullable: true })
  other_info_loading_capacity: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  other_info_ac_system: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  other_info_ac_zoning: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  other_info_electricity: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  other_info_power_unit: string;

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
  @JoinColumn({ name: 'property_id', referencedColumnName: 'reference_id' })
  images?: MediaDB[];

  // @OneToMany(() => PropertyPicDB, (pic) => pic.property, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  // pic?: PropertyPicDB[];
}
