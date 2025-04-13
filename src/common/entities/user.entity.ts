import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RoleEnum } from '../enums';
import { IUser } from '../interfaces/user.interface';
import { MediaDB } from './media.entity';

@Entity({ name: 'users' })
export class UsersDB implements IUser {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  username: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profile_picture: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.STAFF,
  })
  role: RoleEnum;

  @Column({ type: 'timestamp', nullable: true })
  join_date: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: string;

  @Column({ type: 'varchar', length: 100 })
  created_by: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updated_by: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  deleted_by: string;

  // @OneToOne(() => MediaDB, (media) => media.user, {
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'id', referencedColumnName: 'reference_id' })
  // image?: MediaDB;
}
