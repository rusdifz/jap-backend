import { StatusPublishEnum } from '../enums';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'article' })
export class ArticleDB {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  article_id: number;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'varchar', length: 250 })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  thumbnail: string;

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
}
