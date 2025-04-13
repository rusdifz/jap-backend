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
import { IFeedback } from '../interfaces/feedback.interface';
import { MediaDB } from './media.entity';
import { StatusPublishEnum } from '../enums';

@Entity({ name: 'feedback' })
export class FeedbackDB implements IFeedback {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  feedback_id: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  profile_image: string;

  @Column({ type: 'varchar', length: 200 })
  profile_name: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({
    type: 'enum',
    enum: StatusPublishEnum,
    default: StatusPublishEnum.DRAFT,
  })
  status_publish: StatusPublishEnum;

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

  // @OneToOne(() => MediaDB, (media) => media.feedback, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'feedback_id', referencedColumnName: 'reference_id' })
  // image?: MediaDB;
}
