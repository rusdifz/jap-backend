import {
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

import { MediaTypeEnum, MimeTypeEnum } from '../enums';

import { IMedia } from '../interfaces/media.interface';
import { PropertiesDB } from './property.entity';

@Entity({ name: 'media' })
export class MediaDB implements IMedia {
  @PrimaryGeneratedColumn('uuid')
  media_id: string;

  @Column({ type: 'bigint' })
  property_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  host: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  path: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: MediaTypeEnum,
    default: MediaTypeEnum.IMAGE,
  })
  type: MediaTypeEnum;

  @Column({
    type: 'enum',
    enum: MimeTypeEnum,
    default: MimeTypeEnum.JPG,
  })
  mimetype: MimeTypeEnum | string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => PropertiesDB, (property) => property.images, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  property: PropertiesDB;
}
