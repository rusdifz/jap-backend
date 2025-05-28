import { StatusPublishEnum } from '../enums';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MediaDB } from './media.entity';

@Entity({ name: 'article' })
export class ArticleDB {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  article_id: number;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'varchar', length: 250 })
  slug: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  url_youtube: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  tags: string;

  @Column({
    type: 'enum',
    enum: StatusPublishEnum,
    default: StatusPublishEnum.DRAFT,
  })
  status_publish: StatusPublishEnum;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;

  @Column({ type: 'varchar', length: 250 })
  created_by?: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  updated_by?: string;

  // @OneToOne(() => MediaDB, (media) => media.article, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'article_id', referencedColumnName: 'reference_id' })
  // image?: MediaDB;
}
