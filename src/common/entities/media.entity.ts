import {
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
  OneToOne,
} from 'typeorm';

import { MediaReferenceType, MediaTypeEnum, MimeTypeEnum } from '../enums';

import { IMedia } from '../interfaces/media.interface';
import { PropertiesDB } from './property.entity';
import { FeedbackDB } from './feedback.entity';
import { UsersDB } from './user.entity';
import { ArticleDB } from './article.entity';

@Entity({ name: 'media' })
export class MediaDB implements IMedia {
  @PrimaryGeneratedColumn('uuid')
  media_id: string;

  @Column({ type: 'bigint', default: 0 })
  reference_id: number; //id dari file parent yang berkaitan

  @Column({
    type: 'enum',
    enum: MediaReferenceType,
    default: MediaReferenceType.PROPERTY,
  })
  reference_type: MediaReferenceType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  host: string; //nama hosting cloudinary

  @Column({ type: 'varchar', length: 255, nullable: true })
  path: string; //folder name in cloudinary

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public_id: string; //public id

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
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'reference_id', referencedColumnName: 'property_id' })
  property: PropertiesDB;

  // @OneToOne(() => ArticleDB, (article) => article.image, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'reference_id', referencedColumnName: 'article_id' })
  // article: ArticleDB;

  // @OneToOne(() => FeedbackDB, (feedback) => feedback.image, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'reference_id', referencedColumnName: 'feedback_id' })
  // feedback: FeedbackDB;

  // @OneToOne(() => UsersDB, (user) => user.image, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'reference_id', referencedColumnName: 'id' })
  // user: UsersDB;
}
