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

import { PropertiesDB } from 'src/common';

@Entity({ name: 'property_pic' })
export class PropertyPicDB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  property_id: number;

  @Column({ type: 'varchar', length: 100 })
  pic_name: string;

  @Column({ type: 'varchar', length: 50 })
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

  @ManyToOne(() => PropertiesDB, (office) => office.pic, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
  property?: PropertiesDB;
}
